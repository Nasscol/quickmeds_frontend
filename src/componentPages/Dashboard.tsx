import React from 'react'
import {TopMedicineTable, WelcomeScreen } from '@/components/DashBoard'
import { DashHeading } from '@/components/Global'
import Weekly_Sales from '@/charts/Weekly_Sales'
import Top_Selling_Medicine from '@/charts/Top_Selling_Medicine'
import Monthly_Sales from '@/charts/Monthly_Sales'
import Weekly_Items from '@/charts/Weekly_Items'

const Dashboard = () => {
  
  return (
    <section>
      
      <div className='mb-5'>
        <DashHeading Title='Dashboard' />
        <WelcomeScreen />
      </div>

      <div className='flex flex-col lg:flex-row gap-10 mb-5'>
        <Weekly_Sales />
        <Top_Selling_Medicine />
      </div>

      <div className='flex flex-col lg:flex-row gap-10 mb-5'>
        <Weekly_Items />
        <Monthly_Sales />
      </div>

      </section>
  )
}

export default Dashboard