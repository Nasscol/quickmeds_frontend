'use client'

import { BatchType } from "@/interfaces"
import Image from "next/image"
import { useState } from "react"

interface EditBatchFormProps {
  defaultValues?: Partial<BatchType>
  onCancel: () => void
  onSave: () => void
}

export default function ViewBatch({ defaultValues, onCancel, onSave }: EditBatchFormProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  return (
      <div>
        <div className="mb-4 text-sm relative">
          <div className="flex justify-between items-center border-b mb-3 pb-2">

            <h3 className="text-base font-semibold">Medicine Details</h3>
            {defaultValues?.is_expiring_soon && <div className='bg-orange-700 text-gray-100 text-[0.7rem] rounded-xl px-3 py-1 w-max absolute top-0 right-2 cursor-default'>Expires in {defaultValues?.is_expiring_soon} days</div>}
            {defaultValues?.is_expired && <div className='bg-red-800 text-gray-100 text-[0.7rem] rounded-xl px-3 py-1 w-max cursor-default'>Expired</div>}

          </div>
          <div className="flex justify-start gap-x-10">

            <div className="size-50 rounded-lg overflow-hidden border-2 border-gray-200 mb-2 relative">
              {!isLoaded && <div className="absolute inset-0 bg-black/10 animate-pulse rounded z-5" />} 
              <Image src={defaultValues?.medicine_details?.image ?? ""} alt={defaultValues?.medicine_details?.name ?? ""} 
              fill 
              className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} 
              onLoad={() => setIsLoaded(true)}/>
            </div>

            <div className="space-y-1">
              <p><span className="font-semibold">Manufacturer: </span>{defaultValues?.medicine_details?.manufacturer_detail?.name}</p>
              <p><span className="font-semibold">Name: </span>{defaultValues?.medicine_details?.name}</p>
              <p><span className="font-semibold">Generic Name: </span>{defaultValues?.medicine_details?.generic_name}</p>
              <p><span className="font-semibold">Dosage Form: </span>{defaultValues?.medicine_details?.dosage_form}</p>
              <p><span className="font-semibold">Strength: </span>{Number(defaultValues?.medicine_details?.strength).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p><span className="font-semibold">Strength Unit: </span>{defaultValues?.medicine_details?.strength_unit}</p>
              <p className={`${defaultValues?.is_expired ? "text-red-700" : ""} ${defaultValues?.is_expiring_soon ? "text-orange-700" : ""}`}><span className="font-semibold">Expiry Date: </span>{defaultValues?.expiry_date}</p>
            </div>

          </div>
        </div>

        <div className="mb-4 text-sm">
          <h3 className="border-b mb-3 font-semibold">Batch Details</h3>
          <div className="space-y-1">
          <p><span className="font-semibold">Batch Number: </span>{defaultValues?.batch_number}</p>
          <p><span className="font-semibold">Quantity Received: </span>{Number(defaultValues?.quantity_received).toLocaleString('en-US')}</p>
          <p><span className="font-semibold">Quantity Remaining: </span>{Number(defaultValues?.quantity_remaining).toLocaleString('en-US')}</p>
          <p><span className="font-semibold">Purchase Price: </span>UGX {Number(defaultValues?.purchase_price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p><span className="font-semibold">Selling Price Per Unit: </span>UGX {Number(defaultValues?.selling_price_per_unit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="text-sm">
          <h3 className="border-b mb-3 text-base font-semibold">Wholesaler Details</h3>
          <div className="space-y-1">
            <p><span className="font-semibold">Name: </span>{defaultValues?.wholesaler_details?.name}</p>
            <p><span className="font-semibold">Country: </span>{defaultValues?.wholesaler_details?.country}</p>
            <p><span className="font-semibold">Email: </span>{defaultValues?.wholesaler_details?.email}</p>
            <p><span className="font-semibold">Contact: </span>{defaultValues?.wholesaler_details?.contact}</p>
            <p><span className="font-semibold">Address: </span>{defaultValues?.wholesaler_details?.address}</p>
          </div>
        </div>

      </div>
  )
}
