"use client"
import React, { useState } from 'react'
import { useAuth } from '@/context/authContext'
import { Pencil } from "lucide-react"
import { InputField, PasswordField } from '../Global/Form'
import { ChangePasswordFormData, changePasswordSchema } from '@/schema/changePasswordSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useChangePassword } from '@/hooks/users/useUsers'
import { ChangePasswordType } from '@/interfaces'
import { getErrorMessage } from '@/helper'
import LoadingSpinner from '../Global/LoadingSpinner'
import { toast } from 'sonner'

const ChangePassword = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  })
  const [ErrorMessage, ShowErrorMessage] = useState<boolean>(false)
  
  const changePassword = useChangePassword()
  
  function onClear() {
    reset()
    ShowErrorMessage(false)
  }
  
  async function onSubmit(data: ChangePasswordType) {
    if(changePassword.isPending){
      return
    }

    changePassword.mutate(data, {
        onSuccess: () => {
          toast.success("Password changed successfully")
          reset()
          ShowErrorMessage(false)
        },
      onError: (error: any) => {
          const message = getErrorMessage(error, "Password was not changed!")
          toast.error(<span style={{ whiteSpace: "pre-line" }}>{message}</span>);
          ShowErrorMessage(true)
        }
    }
    )
  }
  return (
    <div className='rounded-lg relative shadow bg-white p-6 flex'>
      {changePassword.isPending && <LoadingSpinner />}
      {ErrorMessage && <p className="text-center text-red-500 text-sm absolute bottom-2 left-0 w-full">Sorry, something went wrong!</p>}

        <div>
            <div className='flex justify-between items-center mb-4 border-b pb-2'>
                <h5 className='font-semibold'>Change Password</h5>
                <button title='Edit' className="ml-auto text-blue-600 hover:text-blue-800 cursor-pointer transition-colors">
                    <Pencil size={16} />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-3 w-100 pb-4'>
              <PasswordField required={true} register={register} errors={errors} name='old_password' label='Old Password' placeholder='Enter your old password' />
              <PasswordField required={true} register={register} errors={errors} name='password' label='New Password' placeholder='Enter your new password' />
              <PasswordField required={true} register={register} errors={errors} name='confirmPassword' label='Confirm New Password' placeholder='Enter your old password' />
          
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={onClear} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
                  Clear
                </button>
                <button type="submit" disabled={changePassword.isPending} className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-blue-700 text-sm transition-colors">
                  Save
                </button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default ChangePassword