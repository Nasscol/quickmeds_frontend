"use client"
import { env } from '@/config/env'
import { useSales } from '@/hooks/sales/useSales'
import { SaleHistoryType, SaleSearchQuery } from '@/interfaces'
import { SaleFormData, saleSchema } from '@/schema/saleSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaginationState } from '@tanstack/react-table'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Datatable from '../Global/Datatable'
import { columns } from './Columns'
import TextSearchFields, { DateSearchFields, ReactNumberSearchField } from '../Global/Search/SearchFields'
import { Search, XCircle } from 'lucide-react'




const DataTable = () => {
  const [id, setId] = useState<string | undefined>(undefined)
  const [sold_by, setSold_by] = useState<string | undefined>(undefined)
  const [total_max, setTotal_max] = useState<number | undefined>(undefined)
  const [total_min, setTotal_min] = useState<number | undefined>(undefined)
  const [sold_from, setSold_from] = useState<string | undefined>(undefined)
  const [sold_to, setSold_to] = useState<string | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState<SaleSearchQuery>({id: undefined, sold_by: undefined, total_max: undefined, total_min: undefined, sold_from: undefined, sold_to: undefined})
  const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10})
    
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<SaleFormData>({
        resolver: zodResolver(saleSchema),
      })


    const { data, isLoading, isError } = useSales({page: pagination.pageIndex + 1, ...searchQuery})
    const sales: SaleHistoryType[] = data?.results ?? []

    console.log("Sales: ", sales)

    const clearSearchQueries = () => {
      setId(undefined)
      setSold_by(undefined)
      setTotal_max(undefined)
      setTotal_min(undefined)
      setSold_from(undefined)
      setSold_to(undefined)

      setSearchQuery({id: undefined, sold_by: undefined, total_max: undefined, total_min: undefined, sold_from: undefined, sold_to: undefined})
    }

  return (
    <div>
      <div className='max-w-350 mb-5  mx-auto'>
        <form onSubmit={(e) => {e.preventDefault(); setSearchQuery({id, sold_by, total_max, total_min, sold_from, sold_to})}} className='flex flex-col gap-x-3 gap-y-5'>
                <div className='flex flex-wrap gap-3  items-end'>
                  <TextSearchFields label='Sales ID' name='id' value={id} onChange={setId}/>
                  <TextSearchFields label='Sold By' name='sold_by' value={sold_by} onChange={setSold_by}/>
                  
                  <DateSearchFields label='Sold From' name='sold_from' value={sold_from} onChange={setSold_from}/>
                  <DateSearchFields label='Sold To' name='sold_to' value={sold_to} onChange={setSold_to}/>

                  <ReactNumberSearchField label='Total Min' name='total_min' value={total_min} onChange={setTotal_min}/>
                  <span className='mb-1'>{"-"} </span>
                  <ReactNumberSearchField label='Total Max' name='strength_max' value={total_max} onChange={setTotal_max}/>
                  

                  <div className='flex gap-x-3'>
                    <button type='submit' className=' cursor-pointer text-gray-700 bg-gray-200 hover:bg-blue-100 rounded-full p-2 transition-colors'>
                      <Search size={22}/>
                    </button>
                    <button type='button' onClick={clearSearchQueries} className=' cursor-pointer text-gray-700 bg-gray-200 hover:bg-blue-100 rounded-full p-2 transition-colors'>
                      <XCircle size={22}/>
                    </button>
                </div>
                </div>
                
              </form>
      </div>
      <div className='max-w-350 mx-auto'>
        <Datatable data={sales} columns={columns} isLoading={isLoading} pagination={pagination} setPagination={setPagination} emptyMessage='No sales yet.'/>      
      </div>
    </div>
  )
}

export default DataTable







 {/* <Dropdown
        required ={true}
        name="medicine"
        label="Medicine"
        control={control}
        options={medicine_options ?? []}
        isLoading={Medicine_loading}
        onSearch={setMedicineName}
        placeholder="Select Medicine..."
        errors={errors}
        /> */}
