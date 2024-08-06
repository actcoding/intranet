import { createNewsFormSchema } from "@/lib/components/news/create-news-form/CreateNewsForm.config";
import { UseFormReturn } from "react-hook-form";

export type CreateNewsForm = UseFormReturn<
    Zod.infer<typeof createNewsFormSchema>
>;
