import * as zod from "zod"

export const loginSchema = zod.object({
  username: zod.string().nonempty({ message: "username is required" }).max(100, { message: "Username can't be more than 100 characters" }),
  password: zod.string().nonempty({error: "Password is required"})
})

export type LoginFormData = zod.infer<typeof loginSchema>
