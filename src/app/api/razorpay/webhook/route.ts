import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { db } from '@/lib/db'
import { constantTimeCompare, generateSecureToken } from '@/lib/security'

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('x-razorpay-signature')
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET

    const rawBody = await req.text()

    // 1. Verify webhook signature if secret is configured
    if (secret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex')

      if (!constantTimeCompare(expectedSignature, signature)) {
        console.warn('[Security] Invalid Razorpay webhook signature')
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
      }
    }

    const event = JSON.parse(rawBody)
    const eventType = event?.event
    const payload = event?.payload

    // Handle payment.captured or order.paid
    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const paymentEntity = payload?.payment?.entity
      const orderId = paymentEntity?.order_id
      const paymentId = paymentEntity?.id
      const email = paymentEntity?.email
      const notes = paymentEntity?.notes

      if (orderId && db && db.order) {
        const existing = await db.order.findUnique({ where: { orderId } }).catch(() => null)
        if (!existing) {
          await db.order.create({
            data: {
              orderId,
              paymentId: paymentId || '',
              signature: signature || 'webhook',
              customerName: notes?.customer_name || 'Student',
              customerEmail: email || 'student@example.com',
              amount: 25100,
              currency: 'INR',
              status: 'paid',
              downloadToken: generateSecureToken(),
            },
          }).catch(() => {})
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Internal webhook error' }, { status: 500 })
  }
}
