import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useAuth } from "@/context/authContext"
import { allowedAdminOnlyGroup, SaleHistoryType } from "@/interfaces"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { DeleteSaleDialog, ViewSaleDialog } from "./QuickActions"

interface ActionMenuProps {
  rowData: any
}

export const ActionsButton = ({ rowData }: ActionMenuProps) => {
    const {user} = useAuth()
    const [viewOpen, setViewOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [selectedSale, setSelectedSale] = useState<SaleHistoryType | null>(null)
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
                onClick={() => {setViewOpen(true); setSelectedSale(rowData);} }>
                    View
                </button>

                {user?.groups?.some(group => allowedAdminOnlyGroup.includes(group)) &&
                    <button className="text-sm text-red-600 hover:bg-red-50 rounded px-2 py-1 text-left cursor-pointer"
                        onClick={() => {setDeleteOpen(true); setSelectedSale(rowData);}}>
                            Delete
                    </button>}
            </PopoverContent>
        </Popover>

         <ViewSaleDialog open={viewOpen} setOpen={setViewOpen}  sale={selectedSale}/>
         {user?.groups?.some(group => allowedAdminOnlyGroup.includes(group)) && <DeleteSaleDialog open={deleteOpen} setOpen={setDeleteOpen}  sale={selectedSale}/>}
    </div>
    )
}
