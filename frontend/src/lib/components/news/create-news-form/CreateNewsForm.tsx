"use client";
import {
    createNewsAction,
    editNewsAction,
    uploadNewsFileAction,
} from "@/lib/actions/news";
import { instanceOfNewsUpload200Response } from "@/lib/api/generated";
import { Button } from "@/lib/components/common/Button";
import { Form } from "@/lib/components/common/Form";
import {
    NewsAttachmentsFormField,
    NewsContentFormField,
    NewsHeaderImageFormField,
    NewsTitleFormField,
} from "@/lib/components/news/create-news-form/components/news-form-fields";
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
            attachments: [],
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

                // if (instanceOfNewsUpload200Response(res)) {
                //     router.push(`/news/${createdNews.id}`);
                // } else {
                //     console.error("File upload failed:", res);
                // }

                let content = form.getValues("content");
                const tempImages = content.match(
                    /<img[^>]+data-temp-id="([^"]+)"[^>]*>/g
                );
                console.log("tempImages:", tempImages);
                console.log("contentimages:", form.getValues("contentImages"));

                if (tempImages) {
                    for (let index = 0; index < tempImages.length; index++) {
                        const tempImage = tempImages[index];
                        const file = form.getValues("contentImages")?.[index];
                        console.log("file:", file);
                        if (!file) continue;
                        const imageUrl = await uploadNewsFileAction(
                            createdNews.id,
                            "content",
                            serializeFileData(file.file)
                        );
                        console.log("imageUrl:", imageUrl);
                        content = content.replace(
                            tempImage,
                            `<img src="${imageUrl.url}" alt="Uploaded image">`
                        );
                        console.log("content:", content);
                    }
                }

                console.log("real content:", content);
                await editNewsAction({
                    id: createdNews.id,
                    newsUpdateRequest: { content: content },
                });

                values.attachments?.forEach(async (file) => {
                    const res = await uploadNewsFileAction(
                        createdNews.id,
                        "attachment",
                        serializeFileData(file)
                    );

                    if (!instanceOfNewsUpload200Response(res)) {
                        console.error("File upload failed:", res);
                    }
                });
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
                <NewsAttachmentsFormField form={form} />
                <Button type="submit" className="float-end">
                    Speichern
                </Button>
            </form>
        </Form>
    );
};

export default CreateNewsForm;
