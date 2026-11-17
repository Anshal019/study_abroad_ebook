import { NextResponse } from 'next/server'
import { checkRateLimit, getClientIp, sanitizeEmail, sanitizePhone, sanitizeText } from '@/lib/security'

// Razorpay order creation
// Fixed hardcoded price: ₹251 = 25100 paise (client cannot tamper with price)
const AMOUNT_PAISE = 25100
const CURRENCY = 'INR'

export async function POST(req: Request) {
  try {
    // 1. IP-based Rate Limiting (12 requests/minute)
    const ip = getClientIp(req)
    const rateLimit = checkRateLimit(`order_${ip}`, 12, 60000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    // 2. Parse & Validate Input
    const body = await req.json().catch(() => ({}))
    const rawName = body?.name
    const rawEmail = body?.email
    const rawPhone = body?.phone

    const name = sanitizeText(rawName, 80)
    const email = sanitizeEmail(rawEmail)
    const phone = sanitizePhone(rawPhone)

    if (rawEmail && !email) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    // 3. If Razorpay live/test credentials are configured, create order via official API
    if (keyId && keySecret && !keyId.startsWith('dummy')) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')
      const receipt = `rcpt_${Date.now().toString().slice(-8)}`

      const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: AMOUNT_PAISE,
          currency: CURRENCY,
          receipt,
          notes: {
            product: 'StudyAbroad 2027 E-Book',
            customer_name: name || 'Student',
            customer_email: email || '',
            customer_phone: phone || '',
          },
        }),
      })

      if (!razorpayResponse.ok) {
        const errorData = await razorpayResponse.json().catch(() => ({}))
        console.error('Razorpay API error in create-order:', errorData)
        // Never leak raw backend or auth error details to client
        return NextResponse.json(
          { error: 'Unable to communicate with payment gateway. Please try again shortly.' },
          { status: 502 }
        )
      }

      const orderData = await razorpayResponse.json()
      return NextResponse.json(
        {
          success: true,
          orderId: orderData.id,
          amount: orderData.amount,
          currency: orderData.currency,
          keyId: keyId,
          isTest: false,
        },
        {
          headers: {
            'Cache-Control': 'no-store, max-age=0',
          },
        }
      )
    }

    // 4. Fallback / Test simulation mode if Razorpay credentials are not yet entered in .env
    const mockOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    return NextResponse.json(
      {
        success: true,
        orderId: mockOrderId,
        amount: AMOUNT_PAISE,
        currency: CURRENCY,
        keyId: keyId || '',
        isTest: true,
        message: 'Razorpay test simulation mode active. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env for live gateway.',
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    )
  } catch (error) {
    console.error('Unexpected error in create-order route:', error)
    return NextResponse.json(
      { error: 'An unexpected internal error occurred.' },
      { status: 500 }
    )
  }
}
