import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/lib/components/common/Form";
import { Input } from "@/lib/components/common/Input";
import { NewsFormField } from "@/lib/components/news/create-news-form/CreateNewsForm.types";

interface NewsTitleFormFieldProps extends NewsFormField {}

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
