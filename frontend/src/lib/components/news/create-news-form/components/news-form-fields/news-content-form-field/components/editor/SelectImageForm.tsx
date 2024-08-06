import { Button } from "@/lib/components/common/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/lib/components/common/Form";
import { Input } from "@/lib/components/common/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    imageUrl: z.string(),
});

interface SelectImageFormProps {
    onSubmit: (data: z.infer<typeof formSchema>) => void;
}

const SelectImageForm = (props: SelectImageFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: "",
        },
    });
    return (
        <Form {...form}>
            <form
                onSubmit={(e) => {
                    e.stopPropagation();
                    form.handleSubmit(props.onSubmit)(e);
                }}
                className="flex gap-2"
            >
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" size={"icon"}>
                    <CheckIcon size={20} />
                </Button>
            </form>
        </Form>
    );
};
export default SelectImageForm;
