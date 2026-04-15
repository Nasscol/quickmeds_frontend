import React from 'react'
import { Main } from '@/components/Profile'
import { DashHeading } from '@/components/Global'

const Profile = () => {
  return (
    <div className='pb-20 min-h-170'>
        <DashHeading Title='Profile'/>
        <Main />
    </div>
  )
}

export default Profile