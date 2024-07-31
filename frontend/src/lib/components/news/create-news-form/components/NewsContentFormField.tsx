import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/lib/components/common/Form";
import Editor from "@/lib/components/news/create-news-form/components/editor/Editor";
import { createNewsFormSchema } from "@/lib/components/news/create-news-form/CreateNewsForm.config";
import { UseFormReturn } from "react-hook-form";

interface NewsContentFormFieldProps {
    form: UseFormReturn<Zod.infer<typeof createNewsFormSchema>>;
}
const NewsContentFormField = (props: NewsContentFormFieldProps) => {
    return (
        <FormField
            control={props.form.control}
            name="content"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="sr-only">Content</FormLabel>
                    <FormControl>
                        <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
export default NewsContentFormField;
