import prismadb from '@/lib/prismadb'

type Props = {
  params: { storeId: string }
}

export default async function DashboardPage({ params }: Props) {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  })

  return <div>Active store: {store?.name}</div>
}
