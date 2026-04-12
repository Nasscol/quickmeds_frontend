"use client";
import React from 'react'
import { useDashboardWeeklySales } from "@/hooks/dashboard/useDashboard";
import { formatY_AxisMoney, getDayLabel } from "@/helper";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";


export function Weekly_Sales_Chart() {
    const {data, isLoading} = useDashboardWeeklySales()
    const sales = data?.data

  return (
    <div>
    {isLoading ? <div className="h-[300] w-full bg-black/10 animate-pulse rounded" /> : (
    <ResponsiveContainer debounce={200} width="100%" height={300}>
      <LineChart data={sales} margin={{ left: 20, right: 30, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={getDayLabel} tick={{ fontSize: 12 }}   label={{ value: "Days", position: "insideBottom", offset: -10,  style: { fontSize: 12 } }}/>
        <YAxis tickFormatter={formatY_AxisMoney} tick={{ fontSize: 12 }} label={{ value: "Revenue (UGX)", angle: -90, position: "insideLeft", offset: -3,  style: { fontSize: 12 } }}/>
        <Tooltip
            labelFormatter={(label) => getDayLabel(label)}
            
            formatter={(value) => {
                if (typeof value !== "number") return value;

                return `${value.toLocaleString()} shs`
            }}
        />
        <Line type="monotone" dataKey="total" name="Revenue"  stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
    )}
  </div>
  );
}



const Weekly_Sales = () => {
  return (
    <div className="bg-card border rounded-xl p-6 w-full">
        <div className="mb-6">
            <h4 className="font-semibold">Revenue Trend</h4>
            <p className="text-gray-500 text-xs">Last 7 days</p>
        </div>

        <div>
            <Weekly_Sales_Chart />
        </div>
    </div>
  )
}

export default Weekly_Sales