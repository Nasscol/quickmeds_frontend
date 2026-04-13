'use client'

import { useUpdateRole } from "@/hooks/users/useUsers"
import { EditsaleItemsType, EditSaleType, saleItemsType, SaleType, UserRoleType } from "@/interfaces"
import { RoleFormData, RoleSchema } from "@/schema/roleSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { InputField, ReactNumberField, TextField } from "../Global/Form"
import LoadingSpinner from "../Global/LoadingSpinner"
import { SaleFormData, saleSchema } from "@/schema/saleSchema"
import { SaleItemFormData, saleItemSchema } from "@/schema/saleItemSchema"

interface EditSaleFormProps {
  defaultValues?: Partial<EditsaleItemsType>
  onCancel: () => void
  onSave: () => void
  setItems: Dispatch<SetStateAction<any[]>>
}

export default function EditSaleForm({ defaultValues, onCancel, onSave, setItems }: EditSaleFormProps) {

  const { register, handleSubmit, control, formState: { errors } } = useForm<SaleItemFormData>({
    defaultValues: {quantity: defaultValues?.quantity},
    resolver: zodResolver(saleItemSchema),
  })


const onSubmit = (newData: any) => {
  
  setItems(prev => prev.map(item => item === defaultValues ? { ...item, ...newData } : item ));
  onSave()
};

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden flex flex-col gap-4 w-full mx-auto px-4 py-8 bg-white border rounded-lg shadow-sm ">


          <div className="">
            <div className="flex flex-col gap-y-2 mb-2">
                <div className="flex flex-col gap-y-1">
                    <h6 className="text-gray-700 text-sm font-semibold">Medicine: </h6>
                    <p>{defaultValues?.medicine_name ?? ""}</p>
                </div>

                <div className="flex flex-col gap-y-1">
                    <h6 className="text-gray-700 text-sm font-semibold">Generic Name: </h6>
                    <p>{defaultValues?.generic_name ?? ""}</p>
                </div>
            </div>

            <div className="flex flex-row gap-x-10 mb-2">
                <div className="flex flex-col gap-y-1">
                    <h6 className="text-gray-700 text-sm font-semibold">Strength: </h6>
                    <p>{defaultValues?.strength ?? ""}</p>
                </div>

                <div className="flex flex-col gap-y-1">
                    <h6 className="text-gray-700 text-sm font-semibold">Strength Unit: </h6>
                    <p>{defaultValues?.strength_unit ?? ""}</p>
                </div>
            </div>

            <div className="flex flex-col gap-y-2">
                <ReactNumberField control={control} required={true} label="Quantity" name="quantity" placeholder="Enter Quantity" register={register} errors={errors} />
                <TextField label='Dosage Instructions' name='dosage_instruction' register={register} errors={errors}/>
            </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onCancel} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-blue-700 text-sm transition-colors">
            Save
          </button>
        </div>


        
      </form>
  )
}
