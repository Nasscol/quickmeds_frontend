import { env } from "@/config/env"
import { PaginatedResponse, SaleHistoryType, SaleSearchQuery, SaleType } from "@/interfaces"
import { api } from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const salesAPI = env.salesApi



export function useDashboardDailyKPI() {
  return useQuery({
    queryKey: ["dashboard_kpi"], 
    queryFn: async () => {
      const res = await api.get(`${salesAPI}/dashboard/kpi/me/`)
      // const res = await api.get(`http://127.0.0.1:8000/api/sales/dashboard/kpi/me/`)
      http://127.0.0.1:8000/
      return res.data          
    },
    staleTime: 1000 * 60 * 60,
  })
}

export function useDashboardWeeklySales() {
  return useQuery({
    queryKey: ["dashboard_weeklySales"], 
    queryFn: async () => {
      const res = await api.get(`${salesAPI}/dashboard/charts/me/weekly_sales/`)
      return res.data          
    },
    staleTime: 1000 * 60 * 60,
  })
}