import { StaticImageData } from "next/image";

export interface SidebarLink {
  link_name: string;
  link?: string;
  icon: StaticImageData
  isActive?: boolean;
  options?: {link_name: string, link: string}[]
  adminOnly?: boolean
  tech_And_Admin?: boolean
  isCollapsed?: boolean
  setIsCollapsed?: (isCollapse: boolean) => void;
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface AuthContextType {
  loading: boolean;
}

export interface AuthProviderType {
  children: React.ReactNode;
  initialUser?: User;
  token?: boolean;
}

export type OptionType<T> = {
  label: string;
  value: string;
  data?: T;
};

export type TopMedicineDataType = {
    id: number,
    name: string,
    generic_name: string,
    sold: number,
    created_at: string
}

export type ManufacturersType = {
  id?: string
  name: string
  country?: string
  email?: string
  contact?: string
  address?: string
  created_at?: string
  updated_at?: string
}

export type ManufacturerSearchQuery = {
  page?: number
  name?: string
  country?: string
  email?: string
  contact?: string
}

export type WholesalerType = {
  id?: string
  name: string
  country?: string
  email?: string
  contact?: string
  address?: string
  created_at?: string
  updated_at?: string
}

export type WholesalerSearchQuery = {
  id?: string
  page?: number
  name?: string
  country?: string
  email?: string
  contact?: string
}

export type MedicineType = {
  id?: string
  name: string
  generic_name?: string
  dosage_form?: string
  strength?: number
  strength_unit?: string
  description?: string
  manufacturer_detail: ManufacturersType
  image?: StaticImageData
  created_at?: string
  updated_at?: string
}



export type CreateMedicineType = {
  id?: string
  name: string
  generic_name?: string
  dosage_form?: string | null
  strength?: number
  strength_unit?: string | null
  description?: string
  manufacturer: string
  manufacturer_detail?: ManufacturersType
  image?: File | string | null
}

export type MedicineSearchQuery = {
  id?: string
  page?: number
  name?: string
  generic_name?: string
  dosage_form?: string
  strength?: number
  strength_min?: number
  strength_max?: number
  strength_unit?: string
  manufacturer?: string
  search?: string
}


export type BatchType = {
  id?: string
  batch_number: string
  medicine?: string
  medicine_details?: Partial<MedicineType>
  wholesaler?: string
  wholesaler_details?: Partial<WholesalerType>
  selling_price_per_unit: number
  purchase_price: number
  quantity_received: number
  quantity_remaining?: number
  expiry_date: string
  is_expired?: boolean
  is_expiring_soon?: number
  created_at?: string
  updated_at?: string
}

export type BatchSearchQuery = {
  page?: number
  search?: string
  batch_number?: string
  medicine?: string
  medicine_generic?: string
  wholesaler?: string
  selling_price_per_unit?: number
  selling_price_minimum?: number
  selling_price_maximum ?: number
  purchase_price?: number
  purchase_price_minimum?: number
  purchase_price_maximum?: number
  quantity_received?: number
  quantity_received_min?: number
  quantity_received_max?: number
  quantity_remaining?: number
  quantity_remaining_min?: number
  quantity_remaining_max?: number
  expiry_date?: string
  expiry_date_from?: string
  expiry_date_to?: string
  is_expired?: boolean
}

export type User = {
  id?: string
  username: string
  first_name: string
  last_name: string
  email?: string
  profile_image?: File | string | null
  phone_number?: string
  password?: string
  gender?: string
  role?: string
  groups?: string[]
  is_active?: boolean
  created_at?: string
  updated_at?: string
}

export interface LoginData {
  username: string
  password: string
}

export interface TokenResponse {
  access: string
}

export type UserSearchQuery = {
  page?: number
  search?: string
  first_name?: string
  last_name?: string
  username?: string
  email?: string
  phone_number?: string
  gender?: "male" | "female" | string | null
  is_active?: boolean
}

export type UserRoleType = {
  id?: string
  name?: string
}

export type UserRoleQuery = {
  page?: number
  role?: string
}

export interface InfoDetailsProps {
    heading: string;
    info: string;
    loading?: boolean;
    isFetching?: boolean
    Capitalize?: boolean
}

export interface ChangePasswordType {
  old_password: string;
  password: string;
}



export const allowedTechGroups = ["Admin", "Tech"];
export const allowedAdminOnlyGroup = ["Admin"];

export type SaleType = {
  medicine: string
  quantity: number
  dosage_instruction?: string
  items: any[]
}

export type EditSaleType = {
  quantity: number
  dosage_instruction?: string
}


export const Status_choices = ["Completed", "Archived"] as const;
export type StatusChoice = (typeof Status_choices)[number];   // "Completed" | "Archived"

export type SaleSearchQuery = {
  page?: number
  id?: string
  sold_by?: string
  total_max?: number
  total_min?: number
  sold_from?: string
  sold_to?: string
  status?: StatusChoice
}

export type SaleMedicineType = {
  id?: string
  medicine_id: string,
  name: string
  generic_name?: string
  strength?: number
  strength_unit?: string
  created_at?: string
  updated_at?: string
  current_price?: string
  quantity?: number
  dosage_instructions?: string
  sub_total?: number
}

export type saleItemsType = {
  id?: string
  sale?: string
  medicine: MedicineType
  batch: BatchType
  quantity: number
  dosage_instruction?: string
  unit_price?: number
  sub_total?: number
  created_at?: string
  updated_at?: string
}

export type EditsaleItemsType = {
  medicine_name: string
  generic_name?: string
  quantity: number
  dosage_instruction?: string
  strength?: number
  strength_unit?: string
  unit_price?: number
  sub_total?: number
}

export type SaleHistoryType = {
  id: string
  total_amount: string
  sold_by: string
  saler_details?: User
  items?: saleItemsType[]
  sold_at: string
  updated_at: string
  status?: StatusChoice
}

