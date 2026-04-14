'use client'

import { allowedAdminOnlyGroup, User, UserRoleType } from '@/interfaces';
import { ColumnDef } from '@tanstack/react-table';
import SortableHeader from '../Global/SortableHeader';
import { ActionsButton } from './ActionsButton';

export const getColumns = (user?: User): ColumnDef<UserRoleType>[] => {
  const isAuthorized = user?.groups?.some(group => allowedAdminOnlyGroup.includes(group));

  const baseColumns: ColumnDef<UserRoleType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title="Role" />,
    enableSorting: true,
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