"use client"
import { env } from '@/config/env'
import { useAddSale } from '@/hooks/sales/useSales'
import { MedicineType, OptionType, SaleMedicineType } from '@/interfaces'
import api from '@/lib/axios'
import { SaleFormData, saleSchema } from '@/schema/saleSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Datatable from '../Global/Datatable'
import { AsyncDropdown, ReactNumberField, TextField } from '../Global/Form'
import { columns } from './Columns'




const DataTable = () => {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<SaleFormData>({
        resolver: zodResolver(saleSchema),
      })

    const inventoryAPI = env.inventoryApi
    const [items, setItems] = useState<any[]>([])
    const [selectedMedicine, setSelectedMedicine] = useState<Partial<SaleMedicineType> | undefined>(undefined)
    const scrollRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight; // scroll to bottom
      }
    }, [items])

    const total = items.reduce((sum, item) => {return sum + Number(item.sub_total)}, 0)

    const loadOptions = async (inputValue: string): Promise<OptionType<MedicineType>[]> => {
      const res = await api.get(`${inventoryAPI}/medicine-summary/`, { params: { search: inputValue } });

      return res.data.results.map((med: MedicineType) => ({
        label: `${med.name} ${med.generic_name && `| ${med.generic_name}`}  ${med.strength && `| ${med.strength}`} ${med.strength_unit && ` ${med.strength_unit}`} `,
        value: med.id,
        data: med,
      }));
      };


    const addSales = useAddSale()

    const onSubmit = (data: any) => {
        const medicine_id = selectedMedicine?.id
        const medicine_name = selectedMedicine?.name
        const generic_name = selectedMedicine?.generic_name
        const quantity = Number(data.quantity).toLocaleString('en-US')
        const dosage_instructions = data.dosage_instruction
        const strength = Number(selectedMedicine?.strength)
        const strength_unit = selectedMedicine?.strength_unit
        const current_price = Number(selectedMedicine?.current_price)
        const sub_total = Number(data.quantity) * Number(selectedMedicine?.current_price)
        setItems((prev) => [...prev, { medicine_id, medicine_name, generic_name, quantity, dosage_instructions, current_price, sub_total, strength, strength_unit }])
        //clearForm()
    }

    function clearSale(){
      setItems([])
    }

    function clearForm(){
      reset()
      setSelectedMedicine(undefined)
    }

    async function submitSale(){
      if(!items){
        return
      }

      
      const payload = {items: items}
      console.log(payload)

      addSales.mutate(payload, {
        onSuccess: () => {
          toast.success("Transaction successful")
            clearForm()
            clearSale()
          },
        onError: (error) => {
          toast.error("Transaction failed!")
        }}
      )
    }

  return (
    <div>
        <div className='flex flex-row gap-x-5 justify-center'>
            <div className='w-full max-w-300 flex flex-col'>
              <div>
                 <Datatable data={items} columns={columns} emptyMessage='No sales yet.' noHeight={true}/>
              </div>

                <div className="mt-auto ">

                      <div className='mb-3 flex flex-row justify-between items-center'>
                        <h6 className='font-semibold'>Total: </h6>
                        <p className='tracking-wide'>{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} UGX</p>
                      </div>

                      <div className='flex justify-center gap-2 bg-gray-200/50 py-5 rounded-lg'>
                        <button onClick={submitSale}  className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm transition-colors">
                          Paid
                        </button>
                        
                        <button onClick={clearSale} type="button" className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
                          Clear
                        </button>   
                      </div>

                </div>
            </div>

            <div className='flex flex-col gap-y-4'>
                <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden flex flex-col gap-4 w-113 mx-auto px-4 py-8 bg-white shadow-sm rounded-lg ">
                    <h3 className='capitalize font-semibold tracking-wide text-center text-lg border-b pb-2'>Point Of Sale</h3>
                   
                        <AsyncDropdown 
                          name='medicine_id'
                          label='Medicine'
                          loadOptions={loadOptions}
                          onSelect={setSelectedMedicine}
                          errors={errors}
                          control={control}
                          required={true}
                        />
 
                    <ReactNumberField required={true} control={control} label="Quantity" name="quantity" placeholder="Enter quantity" register={register} errors={errors}/>

                   
                      <TextField label='Dosage Instructions' name='dosage_instruction' register={register} errors={errors}/>

                      <div className='h-12'>
                        <h6 className="capitalize flex text-sm mb-1 font-medium text-gray-700">Unit Price:</h6>
                        <p>{selectedMedicine?.current_price ? `UGX ${Number(selectedMedicine?.current_price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}</p>
                      </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <button type="submit"  className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm transition-colors">
                        Add
                      </button>
                      
                      <button onClick={clearForm} type="button" className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
                        Clear
                      </button>   
                  </div>
                </form>
            </div>
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
