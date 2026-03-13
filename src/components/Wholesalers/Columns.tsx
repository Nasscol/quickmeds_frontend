'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ManufacturersType } from '@/interfaces'
import { ActionsButton } from './ActionsButton'
import { format, parseISO } from "date-fns";
import SortableHeader from '../Global/SortableHeader'

export const columns: ColumnDef<ManufacturersType>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    enableSorting: true,
    cell: ({ getValue }) => {
    const value = String(getValue() ?? "");
    return (
      <div className="max-w-50 truncate" title={value}>
        {value}
      </div>
    );
  },
  },
  {
    accessorKey: 'country',
    header: ({ column }) => <SortableHeader column={column} title="Country" />,
    enableSorting: true,
    cell: ({ getValue }) => {
    const value = String(getValue() ?? "");
    return (
      <div className="max-w-30 truncate" title={value}>
        {value}
      </div>
    );
  },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
    enableSorting: true,
    cell: ({ getValue }) => {
    const value = String(getValue() ?? "");
    return (
      <div className="max-w-50 truncate" title={value}>
        {value}
      </div>
    );
  },
  },
  {
    accessorKey: 'contact',
    header: ({ column }) => <SortableHeader column={column} title="Contact" />,
    enableSorting: true,
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
    accessorKey: 'address',
    header: 'Address',
    cell: ({ getValue }) => {
    const value = String(getValue() ?? "");
    return (
      <div className="max-w-40 truncate" title={value}>
        {value}
      </div>
    );
  },
  },
  {
    accessorKey: 'created_at',
    //header: 'Created At',
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
    //header: 'Updated At',
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
