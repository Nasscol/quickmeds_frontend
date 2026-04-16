import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useMe } from "@/hooks/users/useUsers"
import { allowedAdminOnlyGroup, allowedTechGroups, User } from "@/interfaces"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { DeleteUserDialog, EditUserDialog, ViewUserDialog } from "./QuickActions"

interface ActionMenuProps {
  rowData: any
}

export const ActionsButton = ({ rowData }: ActionMenuProps) => {
    const { data: user, isLoading: UserLoading } = useMe();
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [viewOpen, setViewOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
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

                 {user?.groups?.some(group => allowedTechGroups.includes(group)) && 
                    <button
                    className="text-sm text-gray-900 hover:bg-gray-100 rounded px-2 py-1 text-left cursor-pointer"
                    onClick={() => {setViewOpen(true); setSelectedUser(rowData);} }>
                        View
                    </button>
                }

                {user?.groups?.some(group => allowedAdminOnlyGroup.includes(group)) && 
                    <button
                    className="text-sm text-blue-600 hover:bg-blue-50 rounded px-2 py-1 text-left cursor-pointer"
                    onClick={() => {setEditOpen(true); setSelectedUser(rowData);} }>
                        Edit
                    </button>
                }
                

                {user?.groups?.some(group => allowedAdminOnlyGroup.includes(group)) && 
                    <button
                    className="text-sm text-red-600 hover:bg-red-50 rounded px-2 py-1 text-left cursor-pointer"
                    onClick={() => {setDeleteOpen(true); setSelectedUser(rowData);}}>
                        Delete
                    </button>
                }
            </PopoverContent>
        </Popover>

        <ViewUserDialog open={viewOpen} setOpen={setViewOpen}  user={selectedUser}/>
        <EditUserDialog open={editOpen} setOpen={setEditOpen}  user={selectedUser}/>
        {user?.groups?.some(group => allowedAdminOnlyGroup.includes(group)) && <DeleteUserDialog open={deleteOpen} setOpen={setDeleteOpen}  user={selectedUser}/>}
    </div>
    )
}
