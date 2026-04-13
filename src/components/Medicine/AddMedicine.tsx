'use client'

import { useDosageForms } from "@/hooks/inventory/useDosageForms"
import { useManufacturers } from "@/hooks/inventory/useManufacturers"
import { useAddMedicine } from "@/hooks/inventory/useMedicine"
import { useStrengthUnits } from "@/hooks/inventory/useStrengthUnits"
import { CreateMedicineType, ManufacturersType, OptionType } from "@/interfaces"
import { MedicineFormData, medicineSchema } from "@/schema/medicineSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { AsyncDropdown, Dropdown, ImageField, InputField, ReactNumberField, TextField } from "../Global/Form"
import LoadingSpinner from "../Global/LoadingSpinner"
import { getErrorMessage } from "@/helper"
import { env } from "@/config/env"
import api from "@/lib/axios"


interface AddMedicineFormProps {
  defaultValues?: Partial<MedicineFormData>
  onCancel: () => void
  onSave: () => void
}

export default function AddMedicine({ defaultValues, onCancel, onSave }: AddMedicineFormProps) {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const [ErrorMessage, ShowErrorMessage] = useState<boolean>(false)
  const [image, setImage] = useState<File>();
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<MedicineFormData>({
    defaultValues,
    resolver: zodResolver(medicineSchema),
  })

  const addMedicine = useAddMedicine();
    const inventoryAPI = env.inventoryApi;
  
  const loadManufacturerOptions = async (inputValue: string): Promise<OptionType<ManufacturersType>[]> => {
    const res = await api.get(`${inventoryAPI}/manufacturers/`, { params: { search: inputValue },
    });

    return res.data.results.map((manufacturer: ManufacturersType) => ({
      label: manufacturer.name,
      value: manufacturer.id,
    }));
  };

  const loadDosageFormOptions = async (inputValue: string): Promise<OptionType<any>[]> => {
    const res = await api.get(`${inventoryAPI}/dosage_form/`, { params: { search: inputValue },
    });

    return res.data as { value: string; label: string }[]
  };

  const loadStrengthUnitOptions = async (inputValue: string): Promise<OptionType<any>[]> => {
    const res = await api.get(`${inventoryAPI}/strength_unit/`, { params: { search: inputValue },
    });

    return res.data as { value: string; label: string }[]
  };



const onSubmit = async (data: CreateMedicineType) => {

  if(addMedicine.isPending){
    return
  }

  const formData = new FormData()
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });

  if(image){
    formData.append("image", image)
  }

    addMedicine.mutate(formData, {
        onSuccess: () => {
          toast.success("Medicine added successfully")
           onSave()
          },
        onError: (error) => {
          const message = getErrorMessage(error, "Medicine was not added!");
          toast.error(<span style={{ whiteSpace: "pre-line" }}>{message}</span>);
          ShowErrorMessage(true)
        }
  }
  )
}

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden flex flex-col gap-4 w-full mx-auto px-4 py-8 bg-white border rounded-lg shadow-sm ">
        {addMedicine.isPending && <LoadingSpinner />}
        {ErrorMessage && <p className="text-center text-red-500 text-sm absolute top-3 left-0 w-full">Sorry, something went wrong!</p>}

       
        <div className="flex justify-start items-center">

        <div className="border-r pr-4 gap-y-4 flex flex-col">
          
            <div className="flex flex-row gap-x-5">
              <InputField label="Name" name="name" placeholder="Enter medicine name" register={register} errors={errors} required={true}/>
              <InputField label="Generic Name" name="generic_name" placeholder="Enter generic name" register={register} errors={errors} />
              <AsyncDropdown
                    name="dosage_form"
                    label="Dosage Form"
                    control={control}
                    loadOptions={loadDosageFormOptions}
                    placeholder="Select Dosage Form..."
                    errors={errors}
                  />
            </div>

            <AsyncDropdown
                required={true}
                name="manufacturer"
                label="Manufacturer"
                control={control}
                loadOptions={loadManufacturerOptions}
                placeholder="Select Manufacturer..."
                errors={errors}
              />


            <div className="flex flex-row gap-x-5">
              <ReactNumberField control={control} label="Strength" name="strength" placeholder="Enter strength" register={register} errors={errors}/>
              <AsyncDropdown
                  name="strength_unit"
                  label="Strength Unit"
                  control={control}
                  loadOptions={loadStrengthUnitOptions}
                  placeholder="Select strength unit..."
                  errors={errors}
                  
                />
            </div>

            

            <TextField label="Description" name="description" placeholder="Enter description of the medicine..." register={register} errors={errors} />

            </div>
        

            <div className="mx-auto">
                 <ImageField value={image} onChange={setImage}/>
            </div>

        </div>
      

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onCancel} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={addMedicine.isPending} className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-blue-700 text-sm transition-colors">
            Save
          </button>
        </div>
        
      </form>
  )
}
