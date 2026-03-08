"use client"
import React, { useState } from 'react'
import { useAuth } from '@/context/authContext'
import Image from 'next/image'
import Profile_Pic from "@/assets/profile pics/profile_placeholder.png";

const ImageProfile = () => {
    const {user, loading} = useAuth()
    const [isProfilePicLoaded, setIsProfilePicLoaded] = useState<boolean>(false)

  return (
    <div className='rounded-lg shadow bg-white p-6 flex justify-center items-center w-80'>
        <div>

            <div className='size-40 rounded-full overflow-hidden relative mb-4 border-4 border-gray-300'>
                {loading ? <div className="w-full h-full bg-blue-200/40 animate-pulse rounded" /> : <Image src={user?.profile_image as string ?? Profile_Pic} alt={user?.username ?? "unknown user"} fill  className={`object-cover ${isProfilePicLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} onLoad={() => setIsProfilePicLoaded(true)}/>}
            </div>
            <div className='flex flex-col space-y-2 text-center'>
                {loading ? <div className="h-7 w-32 bg-blue-200/40 animate-pulse rounded mx-auto" /> : <h6 className='text-lg font-semibold text-wrap'>{user ? `${user.first_name} ${user.last_name}` : "Unknown"}</h6>}
                {loading ? <div className="h-5 w-15 bg-blue-200/40 animate-pulse rounded mx-auto" /> : <p className='text-sm font-sm text-wrap text-gray-700'>{user ? `${user.groups}` : "Unknown"}</p>}
                {loading ? <div className="h-6 w-28 bg-blue-200/40 animate-pulse rounded mx-auto" /> : <p className='text-base text-blue-600'>{user ? `${user.phone_number}` : "Unknown"}</p>}
            </div>

        </div>
    </div>
  )
}

export default ImageProfile