import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/lib/components/common/Form";
import { Input } from "@/lib/components/common/Input";
import { CreateNewsForm } from "@/lib/components/news/create-news-form/CreateNewsForm.models";

interface NewsTitleFormFieldProps {
    form: CreateNewsForm;
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
export { NewsTitleFormField };
