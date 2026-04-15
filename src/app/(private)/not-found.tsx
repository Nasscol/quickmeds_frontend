"use client"
import Link from 'next/link'
import Image from 'next/image'
import Doc from "@/assets/doctors/doc-2.png"
import { useState } from 'react'
 
export default function NotFound() {
    
    const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className='flex flex-col gap-y-10 justify-between items-center pt-10'>
        <div className='text-center'>
            <h4 className='font-semibold tracking-wide text-3xl capitalize mb-3'>404 | Page Not Found!</h4>
            <p className='text-gray-800 mb-5'>
                We couldn't find the page you requested.
            </p>
            <Link className="font-semibold px-5 py-2 cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm transition-colors" href={"/dashboard/"}>
                Back to Dashboard
            </Link>
        </div>
        <div className='relative size-120 mx-auto'>
            <Image src={Doc} alt='QuickMeds Unauthorized' fill className={`object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity`} onLoad={() => setImageLoaded(true)} />
        </div>
    </div>
  )
}