import { error } from "console"
import * as zod from "zod"

export const saleSchema = zod.object({
  medicine_id: zod.object({label: zod.string(), value: zod.string(), data: zod.any()}, { message: "Medicine is required" }),
  quantity: zod.number({error: "Please fill in a quantity"}),
  dosage_instruction: zod.string().max(200, { message: "Dosage instruction can't be more than 200 characters" }).optional(),
})

export type SaleFormData = zod.infer<typeof saleSchema>
