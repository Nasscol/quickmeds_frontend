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
      return res.data          
    },
    staleTime: 1000 * 60 * 60,
  })
}