"use client";
import { createNewsAction, uploadNewsFileAction } from "@/lib/actions/news";
import { instanceOfNewsUpload200Response } from "@/lib/api/generated";
import { Button } from "@/lib/components/common/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/lib/components/common/Form";
import Editor from "@/lib/components/news/create-news-form/components/editor/Editor";
import NewsContentFormField from "@/lib/components/news/create-news-form/components/NewsContentFormField";
import NewsHeaderImageFormField from "@/lib/components/news/create-news-form/components/NewsHeaderImageFormField";
import NewsTitleFormField from "@/lib/components/news/create-news-form/components/NewsTitleFormField";
import { createNewsFormSchema } from "@/lib/components/news/create-news-form/CreateNewsForm.config";
import { serializeFileData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface CreateNewsFormProps {}

const CreateNewsForm = (props: CreateNewsFormProps) => {
    const form = useForm<z.infer<typeof createNewsFormSchema>>({
        resolver: zodResolver(createNewsFormSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });
    const router = useRouter();

    async function handleSubmit(values: z.infer<typeof createNewsFormSchema>) {
        try {
            const createdNews = await createNewsAction({
                title: values.title,
                content: values.content,
            });
            if (createdNews) {
                const file = values.headerImage;
                if (!file) return;

                const res = await uploadNewsFileAction(
                    createdNews.id,
                    "header",
                    serializeFileData(file)
                );

                if (instanceOfNewsUpload200Response(res)) {
                    router.push(`/news/${createdNews.id}`);
                } else {
                    console.error("File upload failed:", res);
                }
            }
        } catch (error) {
            console.error("News creation or file upload failed:", error);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <NewsTitleFormField form={form} />
                <NewsHeaderImageFormField form={form} />
                <NewsContentFormField form={form} />
                <Button type="submit" className="float-end">
                    Speichern
                </Button>
            </form>
        </Form>
    );
};

export default CreateNewsForm;
