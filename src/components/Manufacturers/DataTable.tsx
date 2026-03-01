'use client'

import { useManufacturers } from '@/hooks/inventory/useManufacturers'
import { ManufacturerSearchQuery, ManufacturersType } from '@/interfaces'
import { PaginationState, SortingState } from '@tanstack/react-table'
import { Search, XCircle } from 'lucide-react'
import { useState } from 'react'
import { columns } from './Columns'
import { AddManufacturesDialog } from './QuickActions'
import TextSearchFields from './SearchFields'

import Datatable from '../Global/Datatable'

export default function ManufacturerTable() {
  const [name, setName] = useState<string | undefined>(undefined)
  const [country, setCountry] = useState<string | undefined>(undefined)
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [contact, setContact] = useState<string | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState<ManufacturerSearchQuery>({name: undefined, country: undefined, email: undefined, contact: undefined});
  const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10})

  const { data, isLoading } = useManufacturers({page: pagination.pageIndex + 1, ...searchQuery})
  const manufacturers: ManufacturersType[] = data?.results ?? []
  const totalItems = data?.count ?? 0

  const clearSearchQueries = () => {
    setName(undefined)
    setCountry(undefined)
    setEmail(undefined)
    setContact(undefined)

    setSearchQuery({ name: undefined, country: undefined, email: undefined, contact: undefined })
  }

  return (
    <div>
          <div className='flex justify-between mb-5 items-center'>
              <form onSubmit={(e) => {e.preventDefault(); setSearchQuery({name, country, email, contact})}} className='flex gap-x-3 items-center'>
                <TextSearchFields label='Name' name='name' value={name} onChange={setName}/>
                <TextSearchFields label='Country' name='country' value={country} onChange={setCountry}/>
                <TextSearchFields label='Email' name='email' value={email} onChange={setEmail}/>
                <TextSearchFields label='Contact' name='contact' value={contact} onChange={setContact}/>

                <button type='submit' className='mt-auto cursor-pointer text-gray-700 bg-gray-200 hover:bg-blue-100 rounded-full p-2 transition-colors'>
                  <Search size={22}/>
                </button>
                <button type='button' onClick={clearSearchQueries} className='mt-auto cursor-pointer text-gray-700 bg-gray-200 hover:bg-blue-100 rounded-full p-2 transition-colors'>
                  <XCircle size={22}/>
                </button>
              </form>
                <AddManufacturesDialog />
            </div>
            
          <Datatable data={manufacturers} columns={columns} isLoading={isLoading} pagination={pagination} setPagination={setPagination} totalItems={totalItems}/>

    </div>
  )
}
