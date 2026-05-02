"use client"
import Transactions from "@/assets/Icons/cart-1.svg"
import Cash from "@/assets/Icons/cash-2.svg"
import Avg_Transactions from "@/assets/Icons/growth-1.svg"
import Medicine from "@/assets/Icons/medicine-3.svg"
import { useDashboardDailyKPI } from "@/hooks/dashboard/useDashboard"
import { useMe } from "@/hooks/users/useUsers"
import KpiCard from './KPICard'

const WelcomeScreen = () => {
  const { data: user, isLoading: UserLoading, isFetching: UserFetching } = useMe();
  const {data, isLoading: KPILoading, isFetching: KPIfetching} = useDashboardDailyKPI()

  
  return (
    <div className='bg-white rounded-lg border border-gray-100 p-6 flex flex-col lg:flex-row justify-between'>
        <div>
          <h6 className='text-sm'>Welcome Back!</h6>
          {UserLoading || UserFetching ? <div className="h-7 w-24 bg-black/10 animate-pulse rounded lg:mt-1" /> : <h1 className='lg:text-2xl capitalize text-blue-500 lg:mt-1 font-semibold'>{user ? `${user.first_name} ${user.last_name}` : "Unknown"}</h1>}
          
          
          {UserLoading || UserFetching ? <div className="h-4 w-24 bg-black/10 animate-pulse rounded mt-1" /> : <h6 className='text-xs'>{user ? `${user.groups}` : "Unknown"}</h6>}

          <div className='flex flex-col lg:flex-row gap-5 flex-wrap mt-10 justify-center items-center lg:justify-start lg:items-start'>
            <div className="flex flex-col md:flex-row gap-5">
              <KpiCard label="Today's Revenue" value={data?.daily_revenue.value ?? 0} percentage_change={data?.daily_revenue.change_percentage ?? 0} icon={Cash} isMoney={true} isLoading={KPILoading} isFetching={KPIfetching}/>
              <KpiCard label='Avg Transactions' value={data?.average_transaction.value ?? 0} percentage_change={data?.average_transaction.change_percentage ?? 0} icon={Avg_Transactions} isMoney={true} isLoading={KPILoading} isFetching={KPIfetching}/>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <KpiCard label='Transactions' value={data?.number_of_transactions.value ?? 0} percentage_change={data?.number_of_transactions.change_percentage ?? 0} icon={Transactions}  isLoading={KPILoading} isFetching={KPIfetching}/>
              <KpiCard label='Items Sold' value={data?.sold_units.value ?? 0} percentage_change={data?.sold_units.change_percentage ?? 0} icon={Medicine} isLoading={KPILoading} isFetching={KPIfetching}/>
            </div>
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