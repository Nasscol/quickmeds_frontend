"use client"
import { useAuth } from '@/context/authContext'
import { InfoDetailsProps } from '@/interfaces'
import { Pencil } from "lucide-react"


const InfoDetails = ({heading, info, loading}: InfoDetailsProps) => {
    return (
        <div className='flex gap-x-2'>
            {loading ? <div className="h-6 w-68 bg-black/10  animate-pulse rounded" /> : <><h6 className='font-semibold'>{heading}: </h6> <p>{info}</p></>}
        </div>
    )
}

const GeneralInfo = () => {
    const {user, loading} = useAuth()
  return (
    <div className='rounded-lg shadow bg-white p-6 flex'>
        <div>
            <div className='flex justify-between items-center mb-4 border-b pb-2'>
                <h5 className='font-semibold'>General Information</h5>
                <button className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors">
                    <Pencil size={16} />
                </button>
            </div>
            <div className='flex flex-col gap-y-3'>
                <InfoDetails heading='First Name' info={user?.first_name ?? "unknown"} loading={loading}/>
                <InfoDetails heading='Last Name' info={user?.last_name ?? "unknown"} loading={loading}/>
                <InfoDetails heading='Email' info={user?.email ?? "unknown"} loading={loading}/>
                <InfoDetails heading='Phone Number' info={user?.phone_number ?? "unknown"} loading={loading}/>
                <InfoDetails heading='Gender' info={user?.gender ?? "unknown"} loading={loading}/>
            </div>
        </div>
    </div>
  )
}

export default GeneralInfo