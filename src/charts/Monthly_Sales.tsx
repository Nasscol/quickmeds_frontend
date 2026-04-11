"use client";
import { useDashboardMonthlySales } from "@/hooks/dashboard/useDashboard";
import { formatY_AxisMoney, getDayLabel, getMonthLabel } from "@/helper";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";


export function Monthly_Sales_Chart() {
    const {data, isLoading} = useDashboardMonthlySales()
    const sales = data?.data


  return (
    <div>
        {isLoading ? <div className="h-[300] w-full bg-black/10 animate-pulse rounded" /> : (
    
        <ResponsiveContainer width="100%" height={300}>
                <BarChart  data={sales} margin={{ left: 28, right: 30, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
        
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} tickFormatter={(month) => getMonthLabel(month)} label={{ value: "Months", position: "insideBottom", offset: -10,  style: { fontSize: 12 } }}/>
                    
                    <YAxis dataKey="total"  type="number"  tick={{ fontSize: 12, fill: "#000" }} tickFormatter={formatY_AxisMoney} label={{ value: "Revenue (UGX)", angle: -90, position: "insideLeft", offset: -3,  style: { fontSize: 12 } }} />
        
                    <Tooltip
                        labelFormatter={(label) => getMonthLabel(label)}
                        
                        formatter={(value) => {
                            if (typeof value !== "number") return value;
            
                            return `${value.toLocaleString()} shs`
                        }}
                    />
        
                    <Bar dataKey="total" name="Revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        )}
    </div>
  );
}



const Monthly_Sales = () => {
  return (
    <div className="bg-card border rounded-xl p-6 w-full">
        <div className="mb-6">
            <h4 className="font-semibold">Monthly Sales</h4>
            <p className="text-gray-500 text-xs">Last 6 months</p>
        </div>

        <div>
            <Monthly_Sales_Chart />
        </div>
    </div>
  )
}

export default Monthly_Sales