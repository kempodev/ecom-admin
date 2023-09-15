import prismadb from '@/lib/prismadb'
import { currencyFormatter, dateFormatter } from '@/lib/utils'
import { OrderColumn } from './components/Columns'
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

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((item) => item.product.name).join(', '),
    totalPrice: currencyFormatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price)
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: dateFormatter.format(item.createdAt),
  }))
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  )
}
