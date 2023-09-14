import prismadb from '@/lib/prismadb'
import ColorClient from '../colors/components/ColorClient'
import { ColorColumn } from '../colors/components/Columns'

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

  const formatter = new Intl.DateTimeFormat('en-US')
  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: formatter.format(item.createdAt),
  }))
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorClient data={formattedColors} />
      </div>
    </div>
  )
}
