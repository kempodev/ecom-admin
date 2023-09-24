'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { type OrderColumn, columns } from './Columns'

type OrderClientProps = {
  data: OrderColumn[]
}

export default function OrderClient({ data }: OrderClientProps) {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description='Manage orders for your store'
      />

      <Separator />
      <DataTable columns={columns} data={data} searchKey='products' />
    </>
  )
}
