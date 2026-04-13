import { useAuth } from "@/context/authContext"
import { EditsaleItemsType, EditSaleType, saleItemsType, SaleMedicineType } from "@/interfaces"
import { Pencil, Trash } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"
import { EditSaleDialog } from "./QuickActions"
import { set } from "date-fns"

interface ActionMenuProps {
  rowData: any
  onDelete: (rowData: SaleMedicineType) => void
  onEdit: Dispatch<SetStateAction<any[]>>
}

export const ActionsButton = ({ rowData, onDelete, onEdit }: ActionMenuProps) => {
    const [editOpen, setEditOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<EditsaleItemsType | null>(null)

return (
    <div>
        <div className="flex flex-row items-center justify-center gap-x-1">
            <button onClick={() => {setEditOpen(true); setSelectedItem(rowData)}}  className="text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full cursor-pointer p-2 transition-colors">
                <Pencil size={16} />
            </button>

            <button onClick={() => onDelete(rowData)} className="text-red-500 hover:text-red-700 hover:bg-red-200 rounded-full cursor-pointer p-2 transition-colors">
                 <Trash size={16} />
            </button>
        </div>
        

         <EditSaleDialog open={editOpen} setOpen={setEditOpen} saleItem={selectedItem} setItems={onEdit}/>

    </div>
    )
}
