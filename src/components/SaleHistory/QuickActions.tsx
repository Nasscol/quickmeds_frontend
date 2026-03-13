'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDeleteMedicine } from '@/hooks/inventory/useMedicine'
import { SaleHistoryType } from '@/interfaces'
import { Trash } from "lucide-react"
import { toast } from 'sonner'
import ViewSale from "./ViewSale"
import { useDeleteSales } from "@/hooks/sales/useSales"

interface ViewSaleDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  sale: SaleHistoryType | null
}

interface DeleteSaleDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  sale: SaleHistoryType | null
}

export function ViewSaleDialog({ open, setOpen, sale }: ViewSaleDialogProps) {

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto scrollbar-hide ">
          <DialogHeader>
            <DialogTitle>View Sale</DialogTitle>
          </DialogHeader>

          <ViewSale
            defaultValues={sale ?? undefined}
            onCancel={() => setOpen(false)}
            onSave={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
    
  )
}

export function DeleteSaleDialog({ open, setOpen, sale }: DeleteSaleDialogProps) {

  const deleteSale = useDeleteSales()

  const handleDelete = () => {
    if (!sale?.id) return

     deleteSale.mutate(sale.id, {
        onSuccess: () => {
          toast.success("Sale Receipt deleted successfully")
           setOpen(false)
          },
        onError: (error) => {
          toast.error("Sale Receipt was not deleted!")
        }
  })
}

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete Sale</DialogTitle>
          </DialogHeader>

          <div>
            <div className='flex gap-x-4 items-center mb-10'>
              <Trash size={26} className='text-red-500'/>
              <p>Are you sure you want to delete this sale?</p>
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