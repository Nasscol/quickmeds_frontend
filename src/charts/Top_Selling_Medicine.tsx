"use client";
import React from 'react'
import { useDashboardTopSellingMedicine } from '@/hooks/dashboard/useDashboard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";



export function Top_Selling_Chart() {
    const {data, isLoading} = useDashboardTopSellingMedicine()
  const top_selling = data?.data
  
  console.log("Top selling: ",top_selling)
    
  return (
    <div>
        {isLoading ? <div className="h-[300] w-full bg-black/10 animate-pulse rounded" /> : (top_selling.length > 0 ?
        <ResponsiveContainer debounce={200} width="100%" height={300}>
            <BarChart layout="vertical" data={top_selling} margin={{ left: 28, right: 30, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis type="number" dataKey="total_sold" tick={{ fontSize: 12 }} />
                
                <YAxis type="category" dataKey="medicine__generic_name" tick={{ fontSize: 12, fill: "#000" }} />

                <Tooltip formatter={(value) => value === 1 ? `${value} unit` : `${value} units`}/>

                <Bar dataKey="total_sold" name="Total Sold" fill="#3b82f6" radius={[0, 6, 6, 0]} />
            </BarChart>
        </ResponsiveContainer>
        : 
        <div className='w-full h-[300] flex justify-center items-center'>
          <p className='block'>No data to show</p>
        </div>)}
    </div>
  );
}


const Top_Selling_Medicine = () => {
  return (
    <div className="bg-card border rounded-xl p-6 w-full">
            <div className="mb-6">
                <h4 className="font-semibold">Top Selling Medicine</h4>
                <p className="text-gray-500 text-xs">This Month</p>
            </div>
    
            <div>
                <Top_Selling_Chart />
            </div>
        </div>
  )
}

export default Top_Selling_Medicine