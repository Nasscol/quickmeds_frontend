import React from 'react'
import ImageProfile from './ImageProfile'
import GeneralInfo from './GeneralInfo'
import ChangePassword from './ChangePassword'

const Main = () => {
  return (
    <div>
        <div className='flex flex-row gap-5 flex-wrap'>
            <ImageProfile />
            <GeneralInfo />
            <ChangePassword />
        </div>
    </div>
  )
}

export default Main