import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/lib/components/common/Form";
import { Input } from "@/lib/components/common/Input";
import { createNewsFormSchema } from "@/lib/components/news/create-news-form/CreateNewsForm.config";
import { UseFormReturn } from "react-hook-form";

interface NewsTitleFormFieldProps {
    form: UseFormReturn<Zod.infer<typeof createNewsFormSchema>>;
}
const NewsTitleFormField = (props: NewsTitleFormFieldProps) => {
    return (
        <FormField
            control={props.form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Titel</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
export default NewsTitleFormField;
