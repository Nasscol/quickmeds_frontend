import { error } from "console"
import * as zod from "zod"

export const saleItemSchema = zod.object({
  quantity: zod.number({error: "Please fill in a quantity"}),
  dosage_instruction: zod.string().max(200, { message: "Dosage instruction can't be more than 200 characters" }).optional(),
})

export type SaleItemFormData = zod.infer<typeof saleItemSchema>
