import prismadb from '@/lib/prismadb'
import { currencyFormatter, dateFormatter } from '@/lib/utils'
import type { OrderColumn } from './components/Columns'
import OrderClient from './components/OrderClient'

export default async function OrdersPage({
  params,
}: {
  params: { storeId: string }
}) {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    products: order.orderItems.map((item) => item.product.name).join(', '),
    totalPrice: currencyFormatter.format(Number(order.totalAmount)),
    isPaid: order.isPaid,
    createdAt: dateFormatter.format(order.createdAt),
  }))
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  )
}
