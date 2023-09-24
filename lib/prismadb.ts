import { PrismaClient } from '@prisma/client'

// Add prisma to the global object
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Prevent Next.js from creating a new Prisma client on each hot reload
const prismadb = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb

export default prismadb
