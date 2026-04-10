"use client"
import React, { useState } from "react"
import Image, { StaticImageData } from "next/image"
type KpiCardProps = {
  label: string
  value: string | number
  icon: StaticImageData
  bgColor?: string
  textColor?: string
  isMoney?: boolean
  isLoading?: boolean
  percentage_change?: number
}

const KpiCard = ({ label, value, icon, bgColor, textColor, isMoney, isLoading, percentage_change }: KpiCardProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  let symbol = ""
  if (percentage_change != null){
    if (percentage_change >= 0){
      symbol = "+"
    } else {
      symbol = "-"
    }
  }
    


  return (
    <div className={`flex flex-row gap-x-6 justify-between rounded-xl ${bgColor ? bgColor : ""} w-max cursor-pointer hover:-translate-y-2 transition-all rounded-xl border bg-card p-6`}>
      

      <div className="flex flex-col">
        <span className="text-xs text-gray-500 mb-2">{label}</span>
        {isLoading ? <div className="h-7 w-24 bg-black/10 animate-pulse rounded" /> : <p className={`text-xl tracking-tight ${textColor ? textColor : "text-black"}`}>{Number(value).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} <span className="text-black">{isMoney && "shs"}</span></p>}
        {percentage_change != null && (isLoading ? <div className="h-7 w-24 bg-black/10 animate-pulse rounded" /> : <div className={`mt-2 text-sm ${percentage_change >= 0 ? "text-green-600" : "text-red-600"}`}><p>{symbol}{Number(percentage_change).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}<span>% from yesterday</span></p></div>)}
      </div>

      <div className="size-9 relative bg-muted p-2 rounded-lg">
         {!isLoaded && <div className="absolute inset-0 bg-black/10 animate-pulse rounded z-5" />}   
        <Image
          src={icon}
          alt={label}
          className={`h-full w-full object-contain ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

    </div>
  )
}

export default KpiCard
