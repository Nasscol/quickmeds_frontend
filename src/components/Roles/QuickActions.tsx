'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDeleteUserRole } from '@/hooks/users/useUsers'
import { UserRoleType } from '@/interfaces'
import { Trash } from "lucide-react"
import { useState } from 'react'
import { toast } from 'sonner'
import AddRole from './AddRole'
import EditRole from './EditRole'

interface EditUserRoleProps {
  open: boolean
  setOpen: (open: boolean) => void
  role: UserRoleType | null
}

interface DeleteUserRoleDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  role: UserRoleType | null
}


export function AddRoleDialog() {
  const [open, setOpen] = useState(false)

  return (
    <div className='ml-auto'>
      <button className='cursor-pointer block w-max  px-5 py-2 rounded-lg text-white bg-blue-800 text-sm hover:bg-blue-900 transition-colors'
        onClick={() => setOpen(true)}>
        Create Role
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-6xl ">
          <DialogHeader>
            <DialogTitle>Create Role</DialogTitle>
          </DialogHeader>

          <AddRole
            onCancel={() => setOpen(false)}
            onSave={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}


export function EditUserDialog({ open, setOpen, role }: EditUserRoleProps) {

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
          </DialogHeader>

          <EditRole
            defaultValues={role ?? undefined}
            onCancel={() => setOpen(false)}
            onSave={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
    
  )
}

export function DeleteUserDialog({ open, setOpen, role }: DeleteUserRoleDialogProps) {

  const deletRole = useDeleteUserRole()

  const handleDelete = () => {
    if (!role?.id) return

     deletRole.mutate(role.id, {
        onSuccess: () => {
          toast.success("Role deleted successfully")
           setOpen(false)
          },
        onError: (error) => {
          toast.error("Role was not deleted!")
        }
  })
}

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
          </DialogHeader>

          <div>
            <div className='flex gap-x-4 items-center mb-10'>
              <Trash size={26} className='text-red-500'/>
              <p>Are you sure you want to delete this role?</p>
            </div>
              <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setOpen(false)} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
                Cancel
              </button>
              <button type="submit" onClick={handleDelete} className="px-5 py-1 cursor-pointer rounded-lg bg-red-700 text-white hover:bg-red-800 text-sm transition-colors">
                Delete
              </button>
            </div>
          </div>

        </DialogContent>
      </Dialog>
    </div>
    
  )
}