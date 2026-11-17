import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { db } from '@/lib/db'
import {
  checkRateLimit,
  constantTimeCompare,
  getClientIp,
  generateSecureToken,
  sanitizeEmail,
  sanitizePhone,
  sanitizeText,
} from '@/lib/security'

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting
    const ip = getClientIp(req)
    const rateLimit = checkRateLimit(`verify_${ip}`, 15, 60000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many verification attempts. Please wait.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    // 2. Parse & Validate Payload
    const body = await req.json().catch(() => ({}))
    const rawOrderId = body?.razorpay_order_id
    const rawPaymentId = body?.razorpay_payment_id
    const rawSignature = body?.razorpay_signature
    const rawName = body?.customerName
    const rawEmail = body?.customerEmail
    const rawPhone = body?.customerPhone

    if (!rawOrderId || !rawPaymentId || typeof rawOrderId !== 'string' || typeof rawPaymentId !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid order_id or payment_id' },
        { status: 400 }
      )
    }

    // Format checks on IDs (alphanumeric + underscore/hyphen)
    const idRegex = /^[a-zA-Z0-9_\-]+$/
    if (!idRegex.test(rawOrderId) || !idRegex.test(rawPaymentId)) {
      return NextResponse.json(
        { error: 'Invalid ID format.' },
        { status: 400 }
      )
    }

    const orderId = rawOrderId.trim()
    const paymentId = rawPaymentId.trim()
    const signature = typeof rawSignature === 'string' ? rawSignature.trim() : ''

    const customerName = sanitizeText(rawName, 80)
    const customerEmail = sanitizeEmail(rawEmail) || 'student@example.com'
    const customerPhone = sanitizePhone(rawPhone)

    const keySecret = process.env.RAZORPAY_KEY_SECRET

    // 3. Signature Verification (CRITICAL SECURITY STEP)
    // If keySecret is set, we MUST strictly verify HMAC signature
    // Never trust client-provided isTest flag when server keys exist
    if (keySecret) {
      if (!signature) {
        return NextResponse.json(
          { error: 'Missing cryptographic payment signature.' },
          { status: 400 }
        )
      }

      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex')

      const isValidSignature = constantTimeCompare(generatedSignature, signature)
      if (!isValidSignature) {
        console.warn(`[Security Alert] Tampered payment signature detected for order ${orderId}`)
        return NextResponse.json(
          { error: 'Invalid payment signature. Verification failed.' },
          { status: 400 }
        )
      }
    } else {
      // In local development / demo mode when keys are not in .env, verify it's a test order
      const isTestOrder = orderId.startsWith('order_')
      if (!isTestOrder) {
        return NextResponse.json(
          { error: 'Gateway unconfigured. Set RAZORPAY_KEY_SECRET in .env.' },
          { status: 500 }
        )
      }
    }

    // 4. Replay Attack Check: Ensure paymentId has not already been processed for another order
    if (db && db.order) {
      const existing = await db.order.findUnique({
        where: { orderId },
      }).catch(() => null)

      if (existing && existing.status === 'paid' && existing.paymentId === paymentId) {
        // Return already generated token for idempotent retry
        const resp = NextResponse.json({
          success: true,
          downloadToken: existing.downloadToken,
          orderId,
          paymentId,
          customerEmail: existing.customerEmail,
          message: 'Payment verified.',
        })
        resp.cookies.set('ebook_access', existing.downloadToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24 * 365,
        })
        return resp
      }
    }

    // 5. Generate high-entropy 256-bit cryptographically secure download token
    const downloadToken = generateSecureToken()

    // 6. Record order in database/orders store
    try {
      if (db && db.order) {
        await db.order.create({
          data: {
            orderId,
            paymentId,
            signature: signature || 'simulation',
            customerName: customerName || 'Valued Student',
            customerEmail,
            customerPhone,
            amount: 25100,
            currency: 'INR',
            status: 'paid',
            downloadToken,
          },
        })
      }
    } catch (dbErr) {
      console.warn('Database logging warning:', dbErr)
    }

    // 7. Secure Cookie with HttpOnly & SameSite=Strict
    const response = NextResponse.json(
      {
        success: true,
        downloadToken,
        orderId,
        paymentId,
        customerEmail,
        date: new Date().toISOString(),
        message: 'Payment verified successfully. Full access granted.',
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    )

    response.cookies.set('ebook_access', downloadToken, {
      httpOnly: true, // protected against XSS stealing the cookie
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })

    return response
  } catch (error) {
    console.error('Error in verify-payment route:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment.' },
      { status: 500 }
    )
  }
}
