import { error } from "console"
import * as zod from "zod"

export const saleSchema = zod.object({
  medicine: zod.string({ message: "Medicine is required" }).nonempty({ message: "Medicine is required" }).max(100, { message: "Medicine can't be more than 100 characters" }),
  quantity: zod.number({error: "Please fill in a quantity"}),
  dosage_instruction: zod.string().max(200, { message: "Dosage instruction can't be more than 200 characters" }).optional(),
})

export type SaleFormData = zod.infer<typeof saleSchema>
