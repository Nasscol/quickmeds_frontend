'use client'

import { allowedTechGroups, ManufacturersType, User } from '@/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import { format, parseISO } from "date-fns"
import SortableHeader from '../Global/SortableHeader'
import { ActionsButton } from './ActionsButton'

export const getColumns = (user?: User): ColumnDef<ManufacturersType>[] => {
  const isAuthorized = user?.groups?.some(group => allowedTechGroups.includes(group));

  const baseColumns: ColumnDef<ManufacturersType>[] = [
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
]

    if (isAuthorized) {
      baseColumns.push({
        id: 'action',
        header: 'Action',
        cell: ({ row }) => <ActionsButton  rowData={row.original} />
      });
    }
  
    return baseColumns;
}
