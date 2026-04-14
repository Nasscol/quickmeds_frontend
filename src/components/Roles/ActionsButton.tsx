import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { allowedAdminOnlyGroup, UserRoleType } from "@/interfaces"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { DeleteUserDialog, EditUserDialog } from "./QuickActions"
import { useMe } from "@/hooks/users/useUsers"

interface ActionMenuProps {
  rowData: any
}

export const ActionsButton = ({ rowData }: ActionMenuProps) => {
     const { data: user, isLoading: UserLoading } = useMe();
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState<UserRoleType | null>(null)
return (
    <div>
        <Popover>
            <PopoverTrigger asChild>
                <button className="text-blue-600 hover:text-blue-800 hover:bg-gray-200 rounded-full cursor-pointer p-2 transition-colors">
                    <Pencil size={16} />
                </button>
            </PopoverTrigger>

            <PopoverContent
                side="bottom"
                align="end"
                className="w-32 p-2 flex flex-col gap-1">

                {user?.groups?.some(group => allowedAdminOnlyGroup.includes(group)) && 
                    <button
                    className="text-sm text-blue-600 hover:bg-blue-50 rounded px-2 py-1 text-left cursor-pointer"
                    onClick={() => {setEditOpen(true); setSelectedRole(rowData);} }>
                        Edit
                    </button>
                }

                {user?.groups?.some(group => allowedAdminOnlyGroup.includes(group)) && 
                    <button
                    className="text-sm text-red-600 hover:bg-red-50 rounded px-2 py-1 text-left cursor-pointer"
                    onClick={() => {setDeleteOpen(true); setSelectedRole(rowData);}}>
                        Delete
                    </button>
                }
                    
            </PopoverContent>
        </Popover>

          {user?.groups?.some(group => allowedAdminOnlyGroup.includes(group)) && <EditUserDialog open={editOpen} setOpen={setEditOpen}  role={selectedRole}/>}
          {user?.groups?.some(group => allowedAdminOnlyGroup.includes(group)) && <DeleteUserDialog open={deleteOpen} setOpen={setDeleteOpen}  role={selectedRole}/>}
    </div>
    )
}
