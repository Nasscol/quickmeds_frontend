'use client'

import { UserRoleType } from '@/interfaces';
import { ColumnDef } from '@tanstack/react-table';
import SortableHeader from '../Global/SortableHeader';
import { ActionsButton } from './ActionsButton';

export const columns: ColumnDef<UserRoleType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title="Role" />,
    enableSorting: true,
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
