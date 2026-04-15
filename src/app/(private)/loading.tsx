import React from 'react'
import {BarLoader} from "react-spinners"

const loading = () => {
  return (
    <div className='min-h-170 flex flex-2 items-center justify-center bg-slate-100'>
        <BarLoader color="#193cb8"/>
    </div>
  )
}

export default loading