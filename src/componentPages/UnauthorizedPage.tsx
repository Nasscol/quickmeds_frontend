"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Doc from "@/assets/doctors/doc-1.png"
import Link from 'next/link'

const UnauthorizedPage = () => {
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <div className='flex flex-col gap-y-8 justify-between items-center pt-10'>
        <div className='text-center'>
            <h4 className='text-red-700 font-semibold tracking-wide text-3xl capitalize mb-3'>Unauthorized Access!</h4>
            <p className='text-gray-800 mb-5'>
                {"You do not have the necessary permissions to view this page or it's contents."}<br />
                If you believe this is a mistake or your access level should be updated, please contact your Administrator.
            </p>
            <Link className="font-semibold px-5 py-2 cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm transition-colors" href={"/dashboard/"}>
                Back to Dashboard
            </Link>
        </div>
        <div className='relative size-125 mx-auto'>
            <Image src={Doc} alt='QuickMeds Unauthorized' fill className={`object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity`} onLoad={() => setImageLoaded(true)} />
        </div>
    </div>
  )
}

export default UnauthorizedPage