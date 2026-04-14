"use client"
import { useAuth } from '@/context/authContext'
import { InfoDetailsProps } from '@/interfaces'
import { Pencil } from "lucide-react"
import { EditGeneralInfo } from './EditInfoDialog'
import { useState } from 'react'
import { useMe } from '@/hooks/users/useUsers'


const InfoDetails = ({heading, info, loading, isFetching}: InfoDetailsProps) => {
    return (
        <div className='flex gap-x-2'>
            {loading || isFetching ? <div className="h-6 w-68 bg-black/10  animate-pulse rounded" /> : <><h6 className='font-semibold'>{heading}: </h6> <p>{info}</p></>}
        </div>
    )
}

const GeneralInfo = () => {
    const { data: user, isLoading: UserLoading, isFetching: UserFetching } = useMe();
    const [editOpen, setEditOpen] = useState<boolean>(false)
  return (
    <div className='rounded-lg shadow bg-white p-6 flex'>
        <div>
            <div className='flex justify-between items-center mb-4 border-b pb-2'>
                <h5 className='font-semibold'>Profile Information</h5>
                <button title='Edit' onClick={() => setEditOpen(true)} className="ml-auto text-blue-600 hover:text-blue-800 cursor-pointer transition-colors">
                    <Pencil size={16} />
                </button>
                <EditGeneralInfo open={editOpen} setOpen={setEditOpen} info={user}/>
            </div>
            <div className='flex flex-col gap-y-3'>
                <InfoDetails heading='First Name' info={user?.first_name ?? "unknown"} loading={UserLoading} isFetching={UserFetching}/>
                <InfoDetails heading='Last Name' info={user?.last_name ?? "unknown"} loading={UserLoading} isFetching={UserFetching}/>
                <InfoDetails heading='Email' info={user?.email ?? "unknown"} loading={UserLoading} isFetching={UserFetching}/>
                <InfoDetails heading='Phone Number' info={user?.phone_number ?? "unknown"} loading={UserLoading} isFetching={UserFetching}/>
                <InfoDetails heading='Gender' info={user?.gender ?? "unknown"} loading={UserLoading} isFetching={UserFetching}/>
            </div>
        </div>
    </div>
  )
}

export default GeneralInfo