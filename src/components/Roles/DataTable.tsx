'use client'

import { allowedAdminOnlyGroup, UserRoleQuery, UserRoleType } from '@/interfaces'
import { PaginationState } from '@tanstack/react-table'
import { Search, XCircle } from 'lucide-react'
import { useState } from 'react'
import { getColumns } from './Columns'
import { AddRoleDialog } from './QuickActions'
import TextSearchFields from './SearchFields'

import { useMe, useUserRoles } from '@/hooks/users/useUsers'
import Datatable from '../Global/Datatable'

export default function RolesTable() {
  const { data: user, isLoading: UserLoading } = useMe();
  const columns = getColumns(user)
  const [name, setName] = useState<string | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState<UserRoleQuery>()
  const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10})
  const { data, isLoading, isError } = useUserRoles({page: pagination.pageIndex + 1, ...searchQuery})
  const roles: UserRoleType[] = data?.results ?? []

  const totalItems = data?.count ?? 0

  const clearSearchQueries = () => {
    setName(undefined)
    setSearchQuery({role: undefined})
  }

  return (
    <div>
          <div className='flex justify-between items-end mb-5'>
              <form onSubmit={(e) => {e.preventDefault(); setSearchQuery({role: name})}} className='flex flex-col gap-x-3 gap-y-5'>
                <div className='flex flex-wrap gap-3  items-end'>
                  <TextSearchFields label='Role' name='role' value={name} onChange={setName}/>
          
                
                  <div className='ml-5 flex gap-x-3'>
                    <button type='submit' className=' cursor-pointer text-gray-700 bg-gray-200 hover:bg-blue-100 rounded-full p-2 transition-colors'>
                      <Search size={22}/>
                    </button>
                    <button type='button' onClick={clearSearchQueries} className=' cursor-pointer text-gray-700 bg-gray-200 hover:bg-blue-100 rounded-full p-2 transition-colors'>
                      <XCircle size={22}/>
                    </button>
                </div>
                </div>

                
              </form>
                {user?.groups?.some(group => allowedAdminOnlyGroup.includes(group)) && <AddRoleDialog />}
            </div>
            
          <Datatable data={roles} columns={columns} isLoading={isLoading} pagination={pagination} setPagination={setPagination} totalItems={totalItems}/>

    </div>
  )
}
