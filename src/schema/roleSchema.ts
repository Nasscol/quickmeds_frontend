import * as zod from "zod"

export const RoleSchema = zod.object({
  name: zod.string({ message: "Role Name is required" }).nonempty({ message: "Role Name is required" }).max(100, { message: "Role Name must be at most 100 characters" }),
})

export type RoleFormData = zod.infer<typeof RoleSchema>
