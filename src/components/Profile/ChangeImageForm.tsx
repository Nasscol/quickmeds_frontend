import { getErrorMessage } from '@/helper';
import { useUpdateMe } from '@/hooks/users/useUsers';
import { User } from '@/interfaces';
import { EditProfileImage, EditProfileImageFormData } from '@/schema/changeProfileImageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ImageField } from '../Global/Form';
import LoadingSpinner from '../Global/LoadingSpinner';

interface ProfileImageProps {
    defaultImage: Pick<User, "profile_image" | "id">;
    onCancel: () => void
    onSave: () => void
}

const ChangeImageForm = ({defaultImage, onSave, onCancel}: ProfileImageProps) => {
    const [image, setImage] = useState<File | string | undefined>(defaultImage.profile_image ?? undefined);
    const [ErrorMessage, ShowErrorMessage] = useState<boolean>(false)

    const { register, handleSubmit, control, formState: { errors } } = useForm<EditProfileImageFormData>({
        defaultValues: {...defaultImage, profile_image: undefined},
        resolver: zodResolver(EditProfileImage),
      })

      const editUser = useUpdateMe();

    const onSubmit = async (data: Partial<User>) => {

        if(editUser.isPending){
            return
        }

        const formData = new FormData()
        
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
            formData.append(key, value as any);
            }
        });

        if(image && image instanceof File){
            formData.append("profile_image", image)
        }

        editUser.mutate(formData, {
            
            onSuccess: () => {
                toast.success("Profile Image updated successfully")
                onSave()
                },
            onError: (error) => {
                const message = getErrorMessage(error, "Profile Image was not updated!");
                toast.error(<span style={{ whiteSpace: "pre-line" }}>{message}</span>);
                ShowErrorMessage(true);
            }
        }
  )
}
  return (
        <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden flex flex-col gap-4 w-full mx-auto px-4 py-8 bg-white border rounded-lg shadow-sm ">
            {editUser.isPending && <LoadingSpinner />}
            {ErrorMessage && <p className="text-center text-red-500 text-sm absolute top-3 left-0 w-full">Sorry, something went wrong!</p>}
            
            <div className='mx-auto'>
                <ImageField value={image} onChange={setImage} placeholder="Select a profile picture"/>
            </div>
            <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onCancel} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors">
                Cancel
            </button>
            <button type="submit" disabled={editUser.isPending} className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-blue-700 text-sm transition-colors">
                Save
            </button>
            </div>
        </form>
  )
}

export default ChangeImageForm