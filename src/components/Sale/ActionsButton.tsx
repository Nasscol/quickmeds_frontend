import { useAuth } from "@/context/authContext"
import { saleItemsType } from "@/interfaces"
import { Pencil, Trash } from "lucide-react"
import { useState } from "react"
import { EditSaleDialog } from "./QuickActions"

interface ActionMenuProps {
  rowData: any
}

export const ActionsButton = ({ rowData }: ActionMenuProps) => {
    const [editOpen, setEditOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<saleItemsType | null>(null)

    console.log("Edit sale data: ", rowData)
return (
    <div>
        <div className="flex flex-row items-center justify-center gap-x-1">
            <button onClick={() => {setEditOpen(true); setSelectedItem(rowData)}}  className="text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full cursor-pointer p-2 transition-colors">
                <Pencil size={16} />
            </button>

            <button className="text-red-500 hover:text-red-700 hover:bg-red-200 rounded-full cursor-pointer p-2 transition-colors">
                 <Trash size={16} />
            </button>
        </div>
        

         <EditSaleDialog open={editOpen} setOpen={setEditOpen} saleItem={selectedItem}/>

    </div>
    )
}
