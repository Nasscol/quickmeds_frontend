'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EditsaleItemsType } from '@/interfaces'
import { Dispatch, SetStateAction } from "react"
import EditSaleForm from "./EditSaleForm"

interface EditSaleDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  saleItem: EditsaleItemsType | null
  setItems: Dispatch<SetStateAction<any[]>>
}


export function EditSaleDialog({ open, setOpen, saleItem, setItems }: EditSaleDialogProps) {

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Edit Sale Item</DialogTitle>
          </DialogHeader>

          <EditSaleForm
            defaultValues={saleItem ?? undefined}
            onCancel={() => setOpen(false)}
            onSave={() => setOpen(false)}
            setItems={setItems}
          />
        </DialogContent>
      </Dialog>
    </div>
    
  )
}
