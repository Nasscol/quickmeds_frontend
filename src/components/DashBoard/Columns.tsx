'use client'

import { TopMedicineDataType } from '@/interfaces'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<TopMedicineDataType>[] = [
  {
    accessorKey: 'name',
    header: 'Brand',
  },
  {
    accessorKey: 'generic_name',
    header: 'Name',
  },
  {
    accessorKey: 'sold',
    header: 'Sold',
  },
]
