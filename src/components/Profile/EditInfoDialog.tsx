'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User } from "@/interfaces"
import EditInfoForm from "./EditInfoForm"

interface EditGeneralInfoProps {
  open: boolean
  setOpen: (open: boolean) => void
  info: User | undefined
}

export function EditGeneralInfo({ open, setOpen, info }: EditGeneralInfoProps) {

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-3xl ">
          <DialogHeader>
            <DialogTitle>Edit Profile Infomation</DialogTitle>
          </DialogHeader>

          <EditInfoForm
            defaultValues={info ?? undefined}
            onCancel={() => setOpen(false)}
            onSave={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
    
  )
}