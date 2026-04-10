"use client";

import { useDashboardWeeklySales } from "@/hooks/dashboard/useDashboard";
import { formatY_AxisMoney, getDayLabel } from "@/interfaces";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

type Props = {
  data: {
    date: string;
    total: number;
  }[];
};

export function Weekly_Sales_Chart() {
    const {data, isLoading} = useDashboardWeeklySales()
    const sales = data?.data

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={sales} margin={{ left: 20, right: 30, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={getDayLabel} tick={{ fontSize: 12 }}   label={{ value: "Days", position: "insideBottom", offset: -10,  style: { fontSize: 12 } }}/>
        <YAxis tickFormatter={formatY_AxisMoney} tick={{ fontSize: 12 }} label={{ value: "Sales (UGX)", angle: -90, position: "insideLeft", offset: -3,  style: { fontSize: 12 } }}/>
        <Tooltip
            labelFormatter={(label) =>
                new Date(label).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                })
            }
            formatter={(value) => {
                if (typeof value !== "number") return value;

                return value.toLocaleString()
            }}
        />
        <Line type="monotone" dataKey="total" name="Revenue"  stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

import React from 'react'

const Weekly_Sales = () => {
  return (
    <div className="bg-card border rounded-xl p-6 w-150">
        <div className="mb-6">
            <h4 className="font-semibold">Revenue Trend</h4>
            <p className="text-muted-foreground text-sm">Last 7 days</p>
        </div>

        <div>
            <Weekly_Sales_Chart />
        </div>
    </div>
  )
}

export default Weekly_Sales