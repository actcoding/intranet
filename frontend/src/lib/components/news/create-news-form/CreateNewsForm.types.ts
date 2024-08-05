import { createNewsFormSchema } from "@/lib/components/news/create-news-form/CreateNewsForm.config";
import { UseFormReturn } from "react-hook-form";

export interface NewsFormField {
    form: UseFormReturn<Zod.infer<typeof createNewsFormSchema>>;
}
