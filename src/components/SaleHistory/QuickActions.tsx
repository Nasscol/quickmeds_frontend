'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useArchiveSales } from "@/hooks/sales/useSales";
import { SaleHistoryType } from '@/interfaces';
import { Archive } from "lucide-react";
import { toast } from 'sonner';
import LoadingSpinner from "../Global/LoadingSpinner";
import ViewSale from "./ViewSale";
import { getErrorMessage } from "@/helper";

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

  const deleteSale = useArchiveSales()

  const handleDelete = () => {
    if (!sale?.id || !sale.status) return

    const updatedData = {id: sale.id, status: sale.status = "Archived"}

    if (deleteSale.isPending){
      return
    }

     deleteSale.mutate(updatedData, {
        onSuccess: () => {
          toast.success("Sale Receipt archived successfully")
           setOpen(false)
          },
        onError: (error) => {
          const message = getErrorMessage(error, "Sale Receipt was not archived!");
          toast.error(<span style={{ whiteSpace: "pre-line" }}>{message}</span>);
        }
  })
}

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg overflow-hidden">
          <DialogHeader>
            <DialogTitle>Archive Sale</DialogTitle>
          </DialogHeader>

          {deleteSale.isPending && <LoadingSpinner />}

          <div>
            <div className='flex gap-x-4 items-center mb-10'>
              <Archive size={26} className='text-red-500'/>
              <p>Are you sure you want to archive this sale?</p>
            </div>
              <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setOpen(false)} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
                Cancel
              </button>
              <button type="submit" onClick={handleDelete} disabled={deleteSale.isPending} className="px-5 py-1 cursor-pointer rounded-lg bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-red-800 text-sm transition-colors">
                Archive
              </button>
            </div>
          </div>

        </DialogContent>
      </Dialog>
    </div>
    
  )
}




export function UnAarchiveSaleDialog({ open, setOpen, sale }: DeleteSaleDialogProps) {

  const unarchiveSale = useArchiveSales()

  const handleUnArchive = () => {
    if (!sale?.id || !sale.status) return

    const updatedData = {id: sale.id, status: sale.status = "Completed"}

    if (unarchiveSale.isPending){
      return
    }

     unarchiveSale.mutate(updatedData, {
        onSuccess: () => {
          toast.success("Sale Receipt Unarchived successfully")
           setOpen(false)
          },
        onError: (error) => {
          const message = getErrorMessage(error, "Sale Receipt was not Unarchived!");
          toast.error(<span style={{ whiteSpace: "pre-line" }}>{message}</span>);
        }
  })
}

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg overflow-hidden">
          <DialogHeader>
            <DialogTitle>Unarchive Sale</DialogTitle>
          </DialogHeader>

          {unarchiveSale.isPending && <LoadingSpinner />}

          <div>
            <div className='flex gap-x-4 items-center mb-10'>
              <Archive size={26} className='text-green-700'/>
              <p>Are you sure you want to unarchive this sale?</p>
            </div>
              <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setOpen(false)} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
                Cancel
              </button>
              <button type="submit" onClick={handleUnArchive} disabled={unarchiveSale.isPending} className="px-5 py-1 cursor-pointer rounded-lg bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-green-800 text-sm transition-colors">
                Unarchive
              </button>
            </div>
          </div>

        </DialogContent>
      </Dialog>
    </div>
    
  )
}