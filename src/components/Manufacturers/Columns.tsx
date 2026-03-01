'use client'

import { ManufacturersType } from '@/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import { format, parseISO } from "date-fns"
import SortableHeader from '../Global/SortableHeader'
import { ActionsButton } from './ActionsButton'

export const columns: ColumnDef<ManufacturersType>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    enableSorting: true,
  },
  {
    accessorKey: 'country',
    header: ({ column }) => <SortableHeader column={column} title="Country" />,
    enableSorting: true,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
    enableSorting: true,
  },
  {
    accessorKey: 'contact',
    header: ({ column }) => <SortableHeader column={column} title="Contact" />,
    enableSorting: true,
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <SortableHeader column={column} title="Created At" />,
    enableSorting: true,
    cell: ({ row }) => {
      const backendDate = row.original.created_at;
      if (!backendDate) return "-"; 
      const date = parseISO(backendDate);
      return format(date, "MMM dd, yyyy HH:mm"); // e.g., Jan 26, 2026 07:24
    },
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => <SortableHeader column={column} title="Updated At" />,
    enableSorting: true,
    cell: ({ row }) => {
      const backendDate = row.original.updated_at;
      if (!backendDate) return "-"; 
      const date = parseISO(backendDate);
      return format(date, "MMM dd, yyyy HH:mm"); 
    },
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => (
          <div className="flex justify-center">
            <ActionsButton rowData={row.original} />
          </div>
    ),
  },
]
