'use client'

import { User } from "@/interfaces"
import { useState } from "react"
import Image, { StaticImageData } from 'next/image'
import Profile_Pic from "@/assets/profile pics/profile_placeholder.png";

interface EditUserFormProps {
  defaultValues?: Partial<User>
  onCancel: () => void
onSave: () => void
}

export default function ViewStaff({ defaultValues, onCancel, onSave }: EditUserFormProps) {
  const [isProfilePicLoaded, setIsProfilePicLoaded] = useState<boolean>(false)
  const [image, setImage] = useState<File | string | undefined | StaticImageData>(defaultValues?.profile_image ?? undefined);

  console.log("This user: ", defaultValues)

  return (
       <div className="flex flex-row gap-x-5">
        <div>
           <div className='size-40 mx-auto mb-3 rounded-full border-4 border-blue-200 relative overflow-hidden'>
             {!isProfilePicLoaded && <div className="w-full h-full bg-black/10 animate-pulse rounded" />} 
             <Image src={(image as string || image as StaticImageData) ?? ""} alt={defaultValues?.username ?? "unknown user"} fill  className={`object-cover ${isProfilePicLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} onLoad={() => setIsProfilePicLoaded(true)} onError={() => setImage(Profile_Pic)}/>
          </div>

          <div>
          <h6 className="font-semibold text-center capitalize">
            {defaultValues?.first_name} {defaultValues?.last_name}
          </h6>
          <p className="text-center text-sm">
            {defaultValues?.username}
          </p>
          </div>
        </div>

          <div className="flex flex-col gap-y-2 text-sm">
            
            <p className="flex flex-col">
              <span className="text-gray-700 font-semibold">Role: </span>
              {defaultValues?.groups?.join(", ")}
            </p>
            <p className="flex flex-col">
              <span className="text-gray-700 font-semibold">Phone Number: </span>
              {defaultValues?.phone_number}
            </p>
            <p className="flex flex-col">
              <span className="text-gray-700 font-semibold">Email: </span>
              {defaultValues?.email}
            </p>
            <p className="flex flex-col capitalize">
              <span className="text-gray-700 font-semibold">Gender: </span>
              {defaultValues?.gender}
            </p>
            <p className="flex flex-col">
              <span className="text-gray-700 font-semibold">Status: </span>
              {defaultValues?.is_active ? "Active" : "Not Active"}
            </p>
          </div>
       </div>
  )
}
