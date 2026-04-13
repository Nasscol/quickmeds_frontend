"use client"
import React, { useState } from 'react'
import { useAuth } from '@/context/authContext'
import Image from 'next/image'
import Profile_Pic from "@/assets/profile pics/profile_placeholder.png";
import ChangeProfileImageDialog from './ChangeProfileImageDialog';
import { Pencil } from 'lucide-react';
import { useMe } from '@/hooks/users/useUsers';

const ImageProfile = () => {
    const { data: user, isLoading: UserLoading } = useMe();
    const [isProfilePicLoaded, setIsProfilePicLoaded] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

  return (
        <div className='rounded-lg shadow bg-white p-6 flex justify-center items-center w-80'>
            <div>

                <div className='size-40 overflow-hidden relative mb-4 '>
                    <div className='rounded-full border-4 border-blue-200 w-full h-full relative overflow-hidden'>
                        {UserLoading ? <div className="w-full h-full bg-black/10 animate-pulse rounded" /> : <Image src={user?.profile_image as string ?? Profile_Pic} alt={user?.username ?? "unknown user"} fill  className={`object-cover ${isProfilePicLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} onLoad={() => setIsProfilePicLoaded(true)}/>}
                    </div>
                    <button onClick={() => setOpen(true)} className="absolute z-20 bottom-0 right-2 text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-(--blue-150) rounded-full cursor-pointer p-2 transition-colors">
                        <Pencil size={16} />
                    </button>
                </div>
                <div className='flex flex-col space-y-2 text-center'>
                    {UserLoading ? <div className="h-7 w-32 bg-black/10 animate-pulse rounded mx-auto" /> : <h6 className='text-lg font-semibold text-wrap'>{user ? `${user.first_name} ${user.last_name}` : "Unknown"}</h6>}
                    {UserLoading ? <div className="h-5 w-15 bg-black/10 animate-pulse rounded mx-auto" /> : <p className='text-sm font-sm text-wrap text-gray-700'>{user ? `${user.groups}` : "Unknown"}</p>}
                    {UserLoading ? <div className="h-6 w-28 bg-black/10 animate-pulse rounded mx-auto" /> : <p className='text-base text-blue-600'>{user ? `${user.phone_number}` : "Unknown"}</p>}
                </div>

            </div>

            <ChangeProfileImageDialog defaultImage={{profile_image: user?.profile_image, id: user?.id}} open={open} setOpen={setOpen}/>
        </div>
  )
}

export default ImageProfile