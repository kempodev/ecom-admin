'use client'

import { useParams, useRouter } from 'next/navigation'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'
import { type ProductColumn, columns } from './Columns'

type ProductClientProps = {
  data: ProductColumn[]
}

export default function ProductClient({ data }: ProductClientProps) {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Products (${data.length})`}
          description='Manage products for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <PlusIcon className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='name' />
      <Heading title='API' description='API calls for products' />
      <Separator />
      <ApiList entityName='products' entityIdName='productId' />
    </>
  )
}
