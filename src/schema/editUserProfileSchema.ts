import * as zod from "zod"

export const EditUserProfileSchema = zod.object({
  first_name: zod.string().nonempty({ message: "First Name is required" }).max(100, { message: "First Name must be at most 100 characters" }),
  last_name: zod.string().nonempty({ message: "Last Name is required" }).max(100, { message: "Last Name must be at most 100 characters" }),
  username: zod.string().nonempty({ message: "Username is required" }).max(100, { message: "Username must be at most 100 characters" }),
  email: zod.email({ message: "Invalid email address" }).or(zod.literal("")),
  gender: zod.string({error: "Please select a gender"}).nonempty({error: "Please select a gender"}),
  phone_number: zod.string().max(15, { message: "Phone Number must be at most 15 characters" }).optional(),
})

export type EditUserProfileFormData = zod.infer<typeof EditUserProfileSchema>
