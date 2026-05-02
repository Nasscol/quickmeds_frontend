'use client'

import { SaleHistoryType } from '@/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import { format, parseISO } from "date-fns"
import SortableHeader from '../Global/SortableHeader'
import { ActionsButton } from './ActionsButton'

export const columns: ColumnDef<SaleHistoryType>[] = [
  {
    accessorKey: "id",
    header: "Sales ID",
    cell: ({ getValue }) => {
      const value = String(getValue() ?? "");
      return (
        <div className="max-w-30 xl:max-w-70 truncate" title={value}>
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => <SortableHeader column={column} title="Total Amount (UGX)" />,
    enableSorting: true,
    cell: ({ row }) => {
      const money = Number(row.original.total_amount ?? 0).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})
      return (
      <div className='max-w-30 truncate' title={money ?? ""}>
        {money}
      </div>
      )
    }
  },
  {
    accessorKey: "saler_details",
    header: ({ column }) => <SortableHeader column={column} title="Sold By" />,
    enableSorting: true,
    cell: ({ getValue }: any) => {
      const fullName = getValue().first_name + " " + getValue().last_name
      return (
      <div className="max-w-30 truncate" title={fullName ?? ""}>
        {fullName} 
      </div>
      )
  }
  },
   {
      accessorKey: 'sold_at',
      header: "Sold On",
      cell: ({ row }) => {
        const backendDate = row.original.sold_at;
        if (!backendDate) return "-"; 
        const date = parseISO(backendDate);
        return format(date, "MMM dd, yyyy HH:mm"); 
      },
    },
     {
    accessorKey: "status",
    header: "Status",
      cell: ({ getValue }) => {
        const value = String(getValue() ?? "");
        return (
          <div className={`max-w-30 mx-auto truncate cursor-default text-xs text-center text-white ${value == "Completed" ? "rounded-xl px-3 py-1 bg-green-700" : ""} ${value == "Archived" ? "rounded-xl px-3 py-1 bg-red-900" : ""} `} title={value}>
            {value}
          </div>
        );
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
