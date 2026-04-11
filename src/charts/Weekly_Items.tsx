"use client";
import { formatY_AxisMoney, getDayLabel } from "@/helper";
import { useDashboardWeeklyItems } from "@/hooks/dashboard/useDashboard";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export function Weekly_Items_Chart() {
    const {data, isLoading} = useDashboardWeeklyItems()
    const items = data?.data

    console.log("Items: ", items)


  return (
    <div>
        {isLoading ? <div className="h-[300] w-full bg-black/10 animate-pulse rounded" /> : (
    
        <ResponsiveContainer width="100%" height={300}>
                <BarChart  data={items} margin={{ left: 28, right: 30, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
        
                    <XAxis dataKey="date" type="category" tick={{ fontSize: 12 }} tickFormatter={(day) => getDayLabel(day)} label={{ value: "Days", position: "insideBottom", offset: -10,  style: { fontSize: 12 } }}/>
                    
                    <YAxis dataKey="total"  type="number" tick={{ fontSize: 12, fill: "#000" }} tickFormatter={formatY_AxisMoney} label={{ value: "Items Sold", angle: -90, position: "insideLeft", offset: -3,  style: { fontSize: 12 } }} />
        
                    <Tooltip labelFormatter={(label) => getDayLabel(label)}  formatter={(value) => value === 1 ? `${value} unit` : `${value} units`}/>
        
                    <Bar dataKey="total" name="Items Sold" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        )}
    </div>
  );
}



const Weekly_Items = () => {
  return (
    <div className="bg-card border rounded-xl p-6 w-full">
        <div className="mb-6">
            <h4 className="font-semibold">Items Sold</h4>
            <p className="text-gray-500 text-xs">This Week</p>
        </div>

        <div>
            <Weekly_Items_Chart />
        </div>
    </div>
  )
}

export default Weekly_Items