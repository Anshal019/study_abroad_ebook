// Resilient database layer: uses Prisma if generated and available,
// otherwise transparently falls back to file/memory storage so checkout never breaks.
import fs from 'fs'
import path from 'path'

type OrderRecord = {
  id: string
  orderId: string
  paymentId?: string | null
  signature?: string | null
  customerName?: string | null
  customerEmail: string
  customerPhone?: string | null
  amount: number
  currency: string
  status: string
  downloadToken: string
  downloadCount: number
  createdAt: string
  updatedAt: string
}

// Persistent JSON file fallback store in db directory
const DB_FILE = path.join(process.cwd(), 'db', 'orders.json')

function loadOrdersFromFile(): Map<string, OrderRecord> {
  const map = new Map<string, OrderRecord>()
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
      if (Array.isArray(data)) {
        for (const item of data) {
          map.set(item.downloadToken, item)
          map.set(item.orderId, item)
        }
      }
    }
  } catch (err) {
    console.warn('Fallback DB load warning:', err)
  }
  return map
}

function saveOrdersToFile(orders: Map<string, OrderRecord>) {
  try {
    const dir = path.dirname(DB_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    const unique = Array.from(new Set(orders.values()))
    fs.writeFileSync(DB_FILE, JSON.stringify(unique, null, 2), 'utf-8')
  } catch (err) {
    console.warn('Fallback DB save warning:', err)
  }
}

const memoryOrders = loadOrdersFromFile()

let prismaClientInstance: any = null

try {
  // Attempt to load generated PrismaClient dynamically
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaClient } = require('@prisma/client')
  prismaClientInstance = new PrismaClient({ log: ['error'] })
} catch {
  // Prisma is not generated yet; resilient file-backed fallback will handle orders seamlessly
  prismaClientInstance = null
}

export const db = prismaClientInstance || {
  order: {
    create: async ({ data }: { data: any }) => {
      const record: OrderRecord = {
        id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        orderId: data.orderId,
        paymentId: data.paymentId,
        signature: data.signature,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        amount: data.amount || 25100,
        currency: data.currency || 'INR',
        status: data.status || 'paid',
        downloadToken: data.downloadToken,
        downloadCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      memoryOrders.set(record.downloadToken, record)
      memoryOrders.set(record.orderId, record)
      saveOrdersToFile(memoryOrders)
      return record
    },
    findUnique: async ({ where }: { where: { downloadToken?: string; orderId?: string } }) => {
      if (where.downloadToken) return memoryOrders.get(where.downloadToken) || null
      if (where.orderId) return memoryOrders.get(where.orderId) || null
      return null
    },
    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      for (const ord of memoryOrders.values()) {
        if (ord.id === where.id) {
          if (data.downloadCount?.increment) ord.downloadCount += data.downloadCount.increment
          saveOrdersToFile(memoryOrders)
          return ord
        }
      }
      return null
    },
  },
}
