import * as zod from "zod"

export const EditProfileImage = zod.object({
  profile_image: zod.union([zod.instanceof(File), zod.string()]).nullable().optional(),
})

export type EditProfileImageFormData = zod.infer<typeof EditProfileImage>
