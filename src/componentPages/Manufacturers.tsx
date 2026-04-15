import { DashHeading } from '@/components/Global'
import LoadingSpinner from '@/components/Global/LoadingSpinner'
import { Main } from '@/components/Manufacturers'
import React from 'react'

const Manufacturers = () => {
  return (
    <div className='pb-6'>
        <DashHeading Title='Manufacturers'/>
        <Main />
    </div>
  )
}

export default Manufacturers