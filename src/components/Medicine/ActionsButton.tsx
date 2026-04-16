import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useMe } from "@/hooks/users/useUsers"
import { allowedAdminOnlyGroup, CreateMedicineType } from "@/interfaces"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { DeleteMedicineDialog, EditMedicineDialog } from "./QuickActions"

interface ActionMenuProps {
  rowData: any
}

export const ActionsButton = ({ rowData }: ActionMenuProps) => {
    const { data: user } = useMe();
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [selectedMedicine, setSelectedMedicine] = useState<CreateMedicineType | null>(null)
return (
    <div>
        <Popover>
            <PopoverTrigger asChild>
                <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full cursor-pointer p-2 transition-colors">
                    <Pencil size={16} />
                </button>
            </PopoverTrigger>

            <PopoverContent
                side="bottom"
                align="end"
                className="w-32 p-2 flex flex-col gap-1">
                <button
                className="text-sm text-blue-600 hover:bg-blue-50 rounded px-2 py-1 text-left cursor-pointer"
                onClick={() => {setEditOpen(true); setSelectedMedicine(rowData);} }>
                    Edit
                </button>

                {user?.groups?.some(group => allowedAdminOnlyGroup.includes(group)) &&
                    <button className="text-sm text-red-600 hover:bg-red-50 rounded px-2 py-1 text-left cursor-pointer"
                        onClick={() => {setDeleteOpen(true); setSelectedMedicine(rowData);}}>
                            Delete
                    </button>}
            </PopoverContent>
        </Popover>

         <EditMedicineDialog open={editOpen} setOpen={setEditOpen}  medicine={selectedMedicine}/>
         {user?.groups?.some(group => allowedAdminOnlyGroup.includes(group)) && <DeleteMedicineDialog open={deleteOpen} setOpen={setDeleteOpen}  medicine={selectedMedicine}/>}
    </div>
    )
}
