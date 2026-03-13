'use client'

import { useUpdateRole } from "@/hooks/users/useUsers"
import { UserRoleType } from "@/interfaces"
import { RoleFormData, RoleSchema } from "@/schema/roleSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { InputField } from "../Global/Form"
import LoadingSpinner from "../Global/LoadingSpinner"

interface EditRoleFormProps {
  defaultValues?: Partial<UserRoleType>
  onCancel: () => void
  onSave: () => void
}

export default function EditRole({ defaultValues, onCancel, onSave }: EditRoleFormProps) {
  const [ErrorMessage, ShowErrorMessage] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm<RoleFormData>({
    defaultValues,
    resolver: zodResolver(RoleSchema),
  })

  const editRole = useUpdateRole();


const onSubmit = async (data: UserRoleType) => {

  if(editRole.isPending){
    return
  }

  editRole.mutate({id: defaultValues?.id, data}, {
      onSuccess: () => {
        toast.success("Role updated successfully")
          
          onSave()
        },
      onError: (error) => {
        toast.error("Role was not updated!")
        ShowErrorMessage(true)
      }
  }
  )
}

console.log("Errors:", errors)

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden flex flex-col gap-4 w-full mx-auto px-4 py-8 bg-white border rounded-lg shadow-sm ">
        {editRole.isPending && <LoadingSpinner />}
        {ErrorMessage && <p className="text-center text-red-500 text-sm absolute top-3 left-0 w-full">Sorry, something went wrong!</p>}


          <div className="">
              <InputField required={true} label="Role Name" name="name" placeholder="Enter role name" register={register} errors={errors} />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onCancel} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={editRole.isPending} className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-blue-700 text-sm transition-colors">
            Save
          </button>
        </div>


        
      </form>
  )
}
