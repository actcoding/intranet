import * as z from "zod";

export const createNewsFormSchema = z.object({
    title: z.string(),
    content: z.string(),
    headerImage: z
        .instanceof(File, {
            message: "Invalid file",
        })
        .refine((file) => file.size < 1000000, {
            message: "File size must be less than 1MB",
        }),
    contentImages: z.array(
        z
            .instanceof(File, { message: "Invalid file" })
            .refine((file) => file.size < 1000000, {
                message: "File size must be less than 1MB",
            })
    ),
});
