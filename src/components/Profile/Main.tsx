import React from 'react'
import ImageProfile from './ImageProfile'
import GeneralInfo from './GeneralInfo'

const Main = () => {
  return (
    <div>
        <div className='flex flex-row gap-5 flex-wrap'>
            <ImageProfile />
            <GeneralInfo />
        </div>
    </div>
  )
}

export default Main