import * as zod from "zod"

export const changePasswordSchema = zod.object({
  old_password: zod.string().nonempty({ error: "Old Password is required" }).max(64, { message: "Password cannot be longer than 64 characters" }),
  password: zod.string().nonempty({error: "New Password is required"})
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password cannot be longer than 64 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character"),
  confirmPassword: zod.string().nonempty("Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] })

export type ChangePasswordFormData = zod.infer<typeof changePasswordSchema>
