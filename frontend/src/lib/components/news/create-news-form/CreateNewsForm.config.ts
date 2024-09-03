import * as z from "zod";

export const createNewsFormSchema = z.object({
    title: z.string(),
    content: z.string(),
    headerImage: z
        .instanceof(File, {
            message: "Invalid file",
        })
        .refine(
            (file) => {
                return allowedFileTypes.headerImage.includes(
                    file.type.split("/")[1]
                );
            },
            {
                message: "Invalid file type",
            }
        )
        .refine((file) => file.size < 1000000, {
            message: "File size must be less than 1MB",
        }),
    attachments: z
        .array(
            z
                .instanceof(File, { message: "Invalid file" })
                .refine((file) => file.size < 1000000000, {
                    message: "File size must be less than 1GB",
                })
        )
        .optional(),
    contentImages: z
        .array(
            z.object({
                file: z
                    .instanceof(File, { message: "Invalid file" })
                    .refine((file) => file.size < 1000000000, {
                        message: "File size must be less than 1GB",
                    }),
            })
        )
        .optional(),
});

export const allowedFileTypes = {
    headerImage: ["png", "jpeg", "jpg"],
};
