"use client"
import DashBoardVector from "@/assets/dashboard/quickmeds-dash-1.jpg"
import Cash from "@/assets/Icons/cash-2.svg"
import Medicine from "@/assets/Icons/medicine-3.svg"
import Transactions from "@/assets/Icons/cart-1.svg"
import Avg_Transactions from "@/assets/Icons/growth-1.svg"
import { useAuth } from '@/context/authContext'
import Image from 'next/image'
import KpiCard from './KPICard'
import { useState } from "react"
import { useDashboardDailyKPI } from "@/hooks/dashboard/useDashboard"

const WelcomeScreen = () => {
  const { user, loading } = useAuth();
  const {data, isLoading} = useDashboardDailyKPI()

  console.log("kpi data: ", data)

  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  return (
    <div className='bg-white rounded-lg border border-gray-100 p-6 flex flex-col lg:flex-row justify-between'>
        <div>
          <h6 className='text-sm'>Welcome Back!</h6>
          {loading ? <div className="h-7 w-24 bg-black/10 animate-pulse rounded lg:mt-1" /> : <h1 className='lg:text-2xl capitalize text-blue-500 lg:mt-1 font-semibold'>{user ? `${user.first_name} ${user.last_name}` : "Unknown"}</h1>}
          
          
          {loading ? <div className="h-4 w-24 bg-black/10 animate-pulse rounded mt-1" /> : <h6 className='text-xs'>{user ? `${user.groups}` : "Unknown"}</h6>}

          <div className='flex flex-col md:flex-row gap-x-5 mt-10 justify-center lg:justify-start'>
              <KpiCard label="Today's Revenue" value={data?.daily_revenue.value ?? 0} percentage_change={data?.daily_revenue.change_percentage ?? 0} icon={Cash} isMoney={true} isLoading={isLoading}/>
              <KpiCard label='Avg Transactions' value={data?.average_transaction.value ?? 0} percentage_change={data?.average_transaction.change_percentage ?? 0} icon={Avg_Transactions} isMoney={true} isLoading={isLoading}/>
              <KpiCard label='Transactions' value={data?.number_of_transactions.value ?? 0} percentage_change={data?.number_of_transactions.change_percentage ?? 0} icon={Transactions}  isLoading={isLoading}/>
              <KpiCard label='Items Sold' value={data?.sold_units.value ?? 0} percentage_change={data?.sold_units.change_percentage ?? 0} icon={Medicine} isLoading={isLoading}/>
          </div>
        </div>

        {/* <div className='w-100 mx-auto lg:mx-0 relative'>
          {!isLoaded && <div className="absolute inset-0 bg-black/10 animate-pulse rounded z-5" />}   
          <Image src={DashBoardVector} alt='Dashboard' className={`w-full object-contain ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} onLoad={() => setIsLoaded(true)}/>
        </div> */}
    </div>
  )
}

export default WelcomeScreen