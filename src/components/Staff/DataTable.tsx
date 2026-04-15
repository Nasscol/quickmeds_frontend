'use client'

import { allowedTechGroups, User, UserSearchQuery } from '@/interfaces'
import { PaginationState } from '@tanstack/react-table'
import { Search, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getColumns } from './Columns'
import { AddUserDialog } from './QuickActions'
import TextSearchFields, { ContactSearchField } from './SearchFields'

import { useMe, useUsers } from '@/hooks/users/useUsers'
import Datatable from '../Global/Datatable'
import { toast } from 'sonner'
import { getErrorMessage } from '@/helper'

export default function UserTable() {
  const { data: user, isLoading: UserLoading } = useMe();
  const columns = getColumns(user)
  const [search, setSearch] = useState<string | undefined>(undefined)
  const [first_name, setFirstName] = useState<string | undefined>(undefined)
  const [last_name, setLastName] = useState<string | undefined>(undefined)
  const [username, setUsername] = useState<string | undefined>(undefined)
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [phone_number, setPhoneNumber] = useState<string | undefined>(undefined)
  const [gender, setGender] = useState<string| undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState<UserSearchQuery>({search: undefined, first_name: undefined, last_name: undefined, username: undefined, phone_number: undefined, gender: undefined});
  const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10})
  const { data, isLoading, error } = useUsers({page: pagination.pageIndex + 1, ...searchQuery})
  const users: User[] = data?.results ?? []
  const totalItems = data?.count ?? 0

  const clearSearchQueries = () => {
    setSearch(undefined)
    setFirstName(undefined)
    setLastName(undefined)
    setUsername(undefined)
    setEmail(undefined)
    setPhoneNumber(undefined)
    setGender(undefined)

    setSearchQuery({search: undefined, first_name: undefined, last_name: undefined, username: undefined, phone_number: undefined, gender: undefined})
  }

  
  useEffect(() => {
    if (error) {
      const message = getErrorMessage(error, "Something went wrong!");
      toast.error(message);
    }
  }, [error]);

  return (
    <div>
          <div className='flex justify-between items-end mb-5'>
              <form onSubmit={(e) => {e.preventDefault(); setSearchQuery({search, first_name, last_name, phone_number, email, username, gender})}} className='flex flex-col gap-x-3 gap-y-5'>
                <div className='flex flex-wrap gap-3  items-end'>
                  <TextSearchFields label='First Name' name='first_name' value={first_name} onChange={setFirstName}/>
                  <TextSearchFields label='Last Name' name='last_name' value={last_name} onChange={setLastName}/>
                  <TextSearchFields label='Username' name='username' value={username} onChange={setUsername}/>
                  <TextSearchFields label='Email' name='email' value={email} onChange={setEmail}/>
                  <ContactSearchField label='Phone Number' name='phone_number' value={phone_number} onChange={setPhoneNumber}/>
                  <TextSearchFields label='Gender' name='email' value={gender} onChange={setGender}/>
                  


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
              
              {UserLoading  ? <div className="h-9 w-31 bg-black/10  animate-pulse rounded" />:  (user?.groups?.some(group => allowedTechGroups.includes(group)) &&  <AddUserDialog />) }

            </div>
            
          <Datatable data={users} columns={columns} isLoading={isLoading} pagination={pagination} setPagination={setPagination} totalItems={totalItems}/>

    </div>
  )
}
