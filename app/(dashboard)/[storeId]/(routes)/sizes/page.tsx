import prismadb from '@/lib/prismadb'
import SizeClient from './components/SizeClient'
import { SizeColumn } from './components/Columns'
import { dateFormatter } from '@/lib/utils'

export default async function SizesPage({
  params,
}: {
  params: { storeId: string }
}) {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: dateFormatter.format(item.createdAt),
  }))
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  )
}
