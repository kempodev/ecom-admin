import prismadb from '@/lib/prismadb'
import BillboardClient from './components/BillboardClient'
import { BillboardColumn } from './components/Columns'
import { dateFormatter } from '@/lib/utils'

export default async function BillboardsPage({
  params,
}: {
  params: { storeId: string }
}) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: dateFormatter.format(item.createdAt),
  }))
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  )
}
