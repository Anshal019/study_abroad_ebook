import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkRateLimit, getClientIp } from '@/lib/security'

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req)
    const rateLimit = checkRateLimit(`check_access_${ip}`, 30, 60000)
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json().catch(() => ({}))
    const token = body?.token || req.headers.get('cookie')?.split('; ')?.find((r) => r.startsWith('ebook_access='))?.split('=')[1]

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ hasAccess: false })
    }

    if (db && db.order) {
      const order = await db.order.findUnique({
        where: { downloadToken: token.trim() },
      }).catch(() => null)

      if (order && order.status === 'paid') {
        return NextResponse.json({
          hasAccess: true,
          order: {
            orderId: order.orderId,
            paymentId: order.paymentId,
            downloadToken: order.downloadToken,
            customerEmail: order.customerEmail,
            date: order.createdAt,
          },
        })
      }
    }

    // In local dev test simulation mode
    if (token.startsWith('dl_') && !process.env.RAZORPAY_KEY_SECRET && /^dl_[a-f0-9]{32,64}$/.test(token)) {
      return NextResponse.json({ hasAccess: true })
    }

    return NextResponse.json({ hasAccess: false })
  } catch (err) {
    return NextResponse.json({ hasAccess: false })
  }
}
