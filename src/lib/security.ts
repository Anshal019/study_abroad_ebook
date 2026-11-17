import crypto from 'crypto'

// ── In-Memory Sliding-Window Rate Limiter ──────────────────────────
type RateLimitRecord = {
  timestamps: number[]
}

const rateLimitStore = new Map<string, RateLimitRecord>()

// Periodically clean up stale records every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of rateLimitStore.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 60000)
      if (record.timestamps.length === 0) {
        rateLimitStore.delete(key)
      }
    }
  }, 300000)
}

/**
 * Checks if a client exceeds a rate limit for an action.
 * @param identifier - e.g. IP address or client hash
 * @param maxRequests - maximum requests allowed in the window
 * @param windowMs - window duration in milliseconds (default 60s)
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  let record = rateLimitStore.get(identifier)

  if (!record) {
    record = { timestamps: [] }
    rateLimitStore.set(identifier, record)
  }

  // Remove timestamps outside window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs)

  if (record.timestamps.length >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  record.timestamps.push(now)
  return { allowed: true, remaining: maxRequests - record.timestamps.length }
}

/**
 * Extracts client IP from standard request headers.
 */
export function getClientIp(req: Request): string {
  const xForwardedFor = req.headers.get('x-forwarded-for')
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim()
  }
  const xRealIp = req.headers.get('x-real-ip')
  if (xRealIp) return xRealIp.trim()
  return '127.0.0.1'
}

/**
 * Constant-time string comparison to prevent timing attacks.
 */
export function constantTimeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, 'utf8')
    const bufB = Buffer.from(b, 'utf8')
    if (bufA.length !== bufB.length) return false
    return crypto.timingSafeEqual(bufA, bufB)
  } catch {
    return false
  }
}

/**
 * Sanitizes generic user text to prevent XSS / script injection.
 */
export function sanitizeText(input: unknown, maxLength: number = 100): string {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .replace(/[<>'"&]/g, '') // strip common injection chars
    .substring(0, maxLength)
}

/**
 * Sanitizes and validates an email address.
 */
export function sanitizeEmail(email: unknown): string | null {
  if (typeof email !== 'string') return null
  const clean = email.trim().toLowerCase().substring(0, 255)
  // Strict RFC-compliant basic email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  if (!emailRegex.test(clean)) return null
  return clean
}

/**
 * Sanitizes and validates Indian phone numbers.
 */
export function sanitizePhone(phone: unknown): string {
  if (typeof phone !== 'string') return ''
  // Strip non-digits
  const digits = phone.replace(/\D/g, '')
  if (digits.length >= 10) {
    return digits.slice(-10) // return last 10 digits
  }
  return digits.substring(0, 15)
}

/**
 * Generates high-entropy cryptographic token for downloads.
 */
export function generateSecureToken(): string {
  return `dl_${crypto.randomBytes(32).toString('hex')}`
}

/**
 * Generates an HMAC-signed token to verify tamper-proof status.
 */
export function signToken(token: string): string {
  const secret = process.env.RAZORPAY_KEY_SECRET || 'studyabroad_secure_token_secret_2027'
  return crypto.createHmac('sha256', secret).update(token).digest('hex')
}
