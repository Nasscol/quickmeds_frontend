'use client'

import { useUpdateMe, useUpdateUser } from "@/hooks/users/useUsers"
import { User } from "@/interfaces"
import { EditUserFormData, EditUserSchema } from "@/schema/editUserSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { ContactField, InputField } from "../Global/Form"
import GenderDropDown from "../Global/Form/GenderDropdown"
import LoadingSpinner from "../Global/LoadingSpinner"
import { getErrorMessage } from "@/helper"

interface EditUserFormProps {
  defaultValues?: Partial<User>
  onCancel: () => void
  onSave: () => void
}

export default function EditInfoForm({ defaultValues, onCancel, onSave }: EditUserFormProps) {
  const [image, setImage] = useState<File | string | undefined>(defaultValues?.profile_image ?? undefined);
  const [ErrorMessage, ShowErrorMessage] = useState<boolean>(false)
  const { register, handleSubmit, control, formState: { errors } } = useForm<EditUserFormData>({
    defaultValues: {...defaultValues, profile_image: undefined, role: defaultValues?.groups?.[0]},
    resolver: zodResolver(EditUserSchema),
  })

  const editUser = useUpdateMe();

  


const onSubmit = async (data: User) => {
  
  if(editUser.isPending){
    return
  }

  editUser.mutate(data, {
    
      onSuccess: () => {
        toast.success("User updated successfully")
          onSave()
        },
      onError: (error) => {
        const message = getErrorMessage(error, "User was not updated!");
        toast.error(<span style={{ whiteSpace: "pre-line" }}>{message}</span>);
        ShowErrorMessage(true)
      }
  }
  )
}


  return (
      <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden flex flex-col gap-4 w-full mx-auto px-4 py-8 bg-white border rounded-lg shadow-sm ">
        {editUser.isPending && <LoadingSpinner />}
        {ErrorMessage && <p className="text-center text-red-500 text-sm absolute top-3 left-0 w-full">Sorry, something went wrong!</p>}

       
            <div className="flex flex-row gap-x-5">
              <InputField required={true} label="First Name" name="first_name" placeholder="Enter first name" register={register} errors={errors} />
              <InputField required={true} label="Last Name" name="last_name" placeholder="Enter last name" register={register} errors={errors} />
              <InputField required={true} label="Username" name="username" placeholder="Enter username" register={register} errors={errors} />
            </div>

            <div className="flex flex-row gap-x-5">
              <InputField label="Email" name="email" placeholder="Enter email" register={register} errors={errors} />
              <ContactField label="Phone Number" name="phone_number" placeholder="Enter phone number" register={register} errors={errors} />
              <GenderDropDown control={control} required={true} label="Gender" placeholder="Select a gender" name="gender" errors={errors}/>
            </div>
      

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onCancel} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={editUser.isPending} className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-blue-700 text-sm transition-colors">
            Save
          </button>
        </div>


        
      </form>
  )
}
