import prismadb from '@/lib/prismadb'

import ProductClient from './components/ProductClient'
import type { ProductColumn } from './components/Columns'
import { currencyFormatter, dateFormatter } from '@/lib/utils'

export default async function ProductPage({
  params,
}: {
  params: { storeId: string }
}) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: currencyFormatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.name,
    quantity: item.quantity,
    createdAt: dateFormatter.format(item.createdAt),
  }))

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  )
}
