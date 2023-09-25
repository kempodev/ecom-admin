import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 })
    }

    const store = await prismadb.store.findUnique({
      where: {
        id: params.storeId,
      },
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log('[STORE_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
