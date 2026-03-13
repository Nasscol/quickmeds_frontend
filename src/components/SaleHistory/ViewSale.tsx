'use client'

import { InfoDetailsProps, SaleHistoryType } from "@/interfaces"
import { format, parseISO } from "date-fns";

interface ViewSaleProps {
  defaultValues?: Partial<SaleHistoryType>
  onCancel: () => void
  onSave: () => void
}

const InfoDetails = ({heading, info, loading}: InfoDetailsProps) => {
    return (
        <div className='flex gap-x-2'>
            {loading ? <div className="h-6 w-68 bg-black/10  animate-pulse rounded" /> : <><h6 className='font-semibold'>{heading}: </h6> <p>{info}</p></>}
        </div>
    )
}


export default function ViewSale({ defaultValues, onCancel, onSave }: ViewSaleProps) {

    let date = ''
    if(defaultValues?.sold_at) {
        const soldAt = parseISO(defaultValues?.sold_at)
        date = format(soldAt, "MMM dd, yyyy - HH:mm");
    }

  return (
        <div>

            <div>
                <h1 className="font-semibold text-gray-700">Sale History</h1>
                <div className="border p-4 rounded-lg w-max text-sm space-y-2 text-gray-800">
                    <InfoDetails heading="Sales ID" info={defaultValues?.id ?? ""}/>
                    <InfoDetails heading="Sold By" info={defaultValues?.saler_details ? `${defaultValues?.saler_details?.first_name} ${defaultValues?.saler_details?.last_name}`: ""}/>
                    <InfoDetails heading="Sold On" info={date}/>
                    <InfoDetails heading="Total Amount" info={defaultValues?.total_amount ? `UGX ${Number(defaultValues?.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}/>
                </div>
                <h2 className="pb-1 border-b font-semibold mt-5 text-gray-700">Sold Items</h2>
                <ul className="text-sm space-y-2 py-2 list-disc">
                    {defaultValues?.items?.map((item, index) => (
                        <li key={index} className=" text-gray-800 border-b pb-1">
                            <p>{item.medicine.name} | {item.medicine.generic_name}</p>
                            <p>{item.quantity ? `x${item.quantity}` : ""}</p>
                            <div>
                                <p>Unit Price: {item.unit_price ? `UGX ${Number(item.unit_price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}</p>
                                <p>Sub Total: {item.sub_total ? `UGX ${Number(item.sub_total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>      

            <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onCancel} className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-800 hover:bg-gray-900 text-white text-sm transition-colors">
                Close
            </button>
            </div>

        </div>
  )
}
