'use client'

import { SaleMedicineType } from '@/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import SortableHeader from '../Global/SortableHeader'
import { ActionsButton } from './ActionsButton'

export const getColumns = (onDelete: (row: any) => void): ColumnDef<SaleMedicineType>[] => [
  {
    accessorKey: "medicine_name",
    header: ({ column }) => <SortableHeader column={column} title="Medicine" />,
    enableSorting: true,
    cell: ({ getValue }) => (
      <div className="max-w-30 truncate" title={getValue() as string ?? ""}>
        {getValue() as string}
      </div>
    ),
  },
  {
    accessorKey: "generic_name",
    header: ({ column }) => <SortableHeader column={column} title="Generic Name" />,
    enableSorting: true,
    cell: ({ getValue }) => (
      <div className="max-w-20 truncate" title={getValue() as string ?? ""}>
        {getValue() as string}
      </div>
    ),
  },
  {
    accessorKey: "strength",
    header: ({ column }) => <SortableHeader column={column} title="Strength" />,
    enableSorting: true,
    cell: ({ row }) =>
      (row.original.strength ?? 0).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }),
  },
  {
    accessorKey: "strength_unit",
    header: "Strength Unit"
  },
   {
    accessorKey: "current_price",
    header: ({ column }) => <SortableHeader column={column} title="Unit Price" />,
    enableSorting: true,
    cell: ({ row }) =>
      (row.original.current_price ?? 0).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <SortableHeader column={column} title="Quantity" />,
    enableSorting: true,
    cell: ({ row }) => 
      <div className='w-10 truncate'>
        {(row.original.quantity ?? 0).toLocaleString("en-US")}
      </div>
  },
  {
    accessorKey: "dosage_instructions",
    header: "Dosage Instruction",
    cell: ({ getValue }) => {
    const value = String(getValue() ?? "");
    return (
      <div className="max-w-27 truncate" title={value}>
        {value}
      </div>
    );
  },
  },
  {
    accessorKey: "sub_total",
    header: ({ column }) => <SortableHeader column={column} title="Sub Total" />,
    enableSorting: true,
    cell: ({ row }) => {
      const money = Number(row.original.sub_total ?? 0).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})
      return (
      <div className='max-w-20 truncate' title={money ?? ""}>
        {money}
      </div>
      )
    }
  },
  {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => (
            <div className="flex justify-center">
              <ActionsButton rowData={row.original} onDelete={onDelete} />
            </div>
      ),
    },
]
