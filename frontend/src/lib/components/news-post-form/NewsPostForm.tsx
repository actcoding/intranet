"use client";
import { Button } from "@/lib/components/common/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/lib/components/common/Form";
import { Input } from "@/lib/components/common/Input";
import Editor from "@/lib/components/editor/Editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    title: z.string(),
    content: z.string(),
    //attachments: z.array(z.string()),
});

interface NewsPostFormProps {}

const NewsPostForm = (props: NewsPostFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(() =>
                    console.log(form.getValues())
                )}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">Content</FormLabel>
                            <FormControl>
                                <Editor {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {/* <FormField
                    control={form.control}
                    name="attachments"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Attachments</FormLabel>
                            <FormControl>
                                <Input {...field} type="file" multiple />
                            </FormControl>
                        </FormItem>
                    )}
                /> */}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};
export default NewsPostForm;
