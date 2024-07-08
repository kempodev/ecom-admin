'use client'

import CellAction from './CellAction'
import type { ColumnDef } from '@tanstack/react-table'

export type ProductColumn = {
  id: string
  name: string
  price: string
  size: string
  category: string
  color: string
  quantity: number
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },

  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        <div
          className='h-6 w-6 rounded-full border'
          style={{ backgroundColor: row.original.color }}
        />
        {row.original.color}
      </div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => (
      <div className='text-right'>{row.original.quantity}</div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => <div className='text-right'>{row.original.price}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
