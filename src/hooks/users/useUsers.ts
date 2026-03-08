import { env } from "@/config/env"
import { LoginData, PaginatedResponse, User, UserRoleQuery, UserRoleType, UserSearchQuery } from "@/interfaces"
import { api } from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const usersAPI = env.usersApi



export function useUsers(params: UserSearchQuery) {
  return useQuery({
    queryKey: ["users", {params}], 
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<User>>(`${usersAPI}/`, {params})
      return res.data          
    },
    staleTime: 1000 * 60 * 60,
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {const res = await api.get<User>(`${usersAPI}/${id}/`)
      return res.data
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  })
}

export function useAddUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post<User>(`${usersAPI}/`, data)
      return res.data
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({id, data}: {id: string | undefined, data: any}) => {const res = await api.patch<User>(`${usersAPI}/${id}/`, data)
      return res.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["user", data.id] })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {const res = await api.delete(`${usersAPI}/${id}/`)
      return res.data
    },
   onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["user", id] })
    },
  })
}

export const useloginUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: LoginData) => {const res = await api.post(`${usersAPI}/auth/login/`, data)
      return res.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["roles"] })
    },
  })
}


export function useUserRoles(params?: UserRoleQuery) {
  return useQuery({
    queryKey: ["roles", {params}], 
    queryFn: async () => {
      const res = await api.get(`${usersAPI}/groups/`, {params})
      return res.data          
    },
    staleTime: 1000 * 60 * 60,
  })
}


export function useAddRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UserRoleType) => {
      const res = await api.post<UserRoleType>(`${usersAPI}/groups/`, data)
      return res.data
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["roles"] })
        queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}



export function useUpdateRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({id, data}: {id: string | undefined, data: any}) => {const res = await api.patch<UserRoleType>(`${usersAPI}/groups/${id}/`, data)
      return res.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] })
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["roles", data.id] })
    },
  })
}




export function useDeleteUserRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {const res = await api.delete(`${usersAPI}/groups/${id}/`)
      return res.data
    },
   onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] })
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["roles", id] })
    },
  })
}