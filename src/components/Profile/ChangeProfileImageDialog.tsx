import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User } from '@/interfaces'
import ChangeImageForm from './ChangeImageForm'

interface ProfileImageProps {
    defaultImage: Partial<User>
    open: boolean
    setOpen: (open: boolean) => void
}

const ChangeProfileImageDialog = ({defaultImage, open, setOpen}: ProfileImageProps) => {
    

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent >
          <DialogHeader>
            <DialogTitle>Change Profile Image</DialogTitle>
          </DialogHeader>

           <ChangeImageForm
                defaultImage={defaultImage}
                onCancel={() => setOpen(false)}
                onSave={() => setOpen(false)}
           />

        </DialogContent>
      </Dialog>
  )
}

export default ChangeProfileImageDialog