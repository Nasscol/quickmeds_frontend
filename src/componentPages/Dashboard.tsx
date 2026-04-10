import React from 'react'
import {TopMedicineTable, WelcomeScreen } from '@/components/DashBoard'
import { DashHeading } from '@/components/Global'
import Weekly_Sales from '@/charts/Weekly_Sales'

const Dashboard = () => {
  
  return (
    <section>
      
      <div className='mb-5'>
        <DashHeading Title='Dashboard' />
        <WelcomeScreen />
      </div>

      <Weekly_Sales />

      <p className='text-center mt-20'>
        {"Work in progress :)"}
      </p>

      </section>
  )
}

export default Dashboard