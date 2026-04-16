import { env } from "@/config/env"
import { PaginatedResponse, SaleHistoryType, SaleSearchQuery, SaleType } from "@/interfaces"
import { api } from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const salesAPI = env.salesApi

export function useSales(params: SaleSearchQuery) {
  return useQuery({
    queryKey: ["sales", {params}], 
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<SaleHistoryType>>(`${salesAPI}/sales/`, {params})
      return res.data          
    },
    staleTime: 1000 * 60 * 60,
  })
}

export function useSale(id: string) {
  return useQuery({
    queryKey: ["sales", id],
    queryFn: async () => {const res = await api.get<SaleType>(`${salesAPI}/sales/${id}/`)
      return res.data
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  })
}

export function useSaleStockAvailable(id?: string) {
  return useQuery({
    queryKey: ["stock_available", id],
    queryFn: async () => {const res = await api.get(`${salesAPI}/stock/${id}/`)
      return res.data
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  })
}

export function useAddSale() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post<SaleType>(`${salesAPI}/sales/`, data)
      return res.data
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["sales"] })
        queryClient.invalidateQueries({ queryKey: ["stock_available"] })
        queryClient.invalidateQueries({ queryKey: ["dashboard_kpi"] })
        queryClient.invalidateQueries({ queryKey: ["dashboard_weeklySales"] })
        queryClient.invalidateQueries({ queryKey: ["dashboard_monthlySales"] })
        queryClient.invalidateQueries({ queryKey: ["dashboard_weeklyItems"] })
        queryClient.invalidateQueries({ queryKey: ["dashboard_topSellingMedicine"] })
        queryClient.invalidateQueries({ queryKey: ["batches"] })
    },
  })
}

export function useArchiveSales() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: {id: string, status: string}) => {const res = await api.patch(`${salesAPI}/sales/${data.id}/`, data)
      return res.data
    },
   onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["sales"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard_kpi"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard_weeklySales"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard_monthlySales"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard_weeklyItems"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard_topSellingMedicine"] })
      queryClient.invalidateQueries({ queryKey: ["sales", id] })
    },
  })
}

