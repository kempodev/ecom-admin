import prismadb from '@/lib/prismadb'
import ColorClient from '../colors/components/ColorClient'
import type { ColorColumn } from '../colors/components/Columns'
import { dateFormatter } from '@/lib/utils'

export default async function ColorsPage({
  params,
}: {
  params: { storeId: string }
}) {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: dateFormatter.format(item.createdAt),
  }))
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorClient data={formattedColors} />
      </div>
    </div>
  )
}
