"use client";
import {
    createNewsAction,
    editNewsAction,
    uploadNewsFileAction,
} from "@/lib/actions/news";
import { instanceOfNewsUpload200Response, News } from "@/lib/api/generated";
import { Button } from "@/lib/components/common/Button";
import { Form } from "@/lib/components/common/Form";
import {
    NewsAttachmentsFormField,
    NewsContentFormField,
    NewsHeaderImageFormField,
    NewsTitleFormField,
} from "@/lib/components/news/create-news-form/components/news-form-fields";
import { createNewsFormSchema } from "@/lib/components/news/create-news-form/CreateNewsForm.config";
import {
    getImagesFromHtml,
    updateAttachments,
    updateContentImages,
} from "@/lib/components/news/create-news-form/CreateNewsForm.utils";
import { serializeFileData, urlToFile } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface CreateNewsFormProps {
    news?: News;
}

const CreateNewsForm = (props: CreateNewsFormProps) => {
    const form = useForm<z.infer<typeof createNewsFormSchema>>({
        resolver: zodResolver(createNewsFormSchema),
        defaultValues: {
            title: props.news?.title ?? "",
            content: props.news?.content ?? "",
            contentImages: props.news?.content
                ? getImagesFromHtml(props.news?.content).map((e) => {
                      return { image: e };
                  })
                : [],
        },
    });

    const router = useRouter();

    useEffect(() => {
        async function loadHeaderImage() {
            if (props.news?.headerImage) {
                try {
                    const file = await urlToFile(
                        props.news.headerImage,
                        "header.png"
                    );
                    form.setValue("headerImage", file, {
                        shouldDirty: false,
                        shouldTouch: false,
                        shouldValidate: false,
                    });
                } catch (error) {
                    console.error(
                        "Fehler beim Laden des Header-Bildes:",
                        error
                    );
                }
            }
        }

        loadHeaderImage();
    }, [props.news?.headerImage, form]);

    async function handleSubmit(values: z.infer<typeof createNewsFormSchema>) {
        try {
            let persistedNewsId: number | undefined;
            if (props.news) {
                await editNewsAction({
                    id: props.news.id,
                    newsUpdateRequest: {
                        title: values.title,
                        content: values.content,
                    },
                });
                persistedNewsId = props.news.id;
            } else {
                const res = await createNewsAction({
                    title: values.title,
                    content: values.content,
                });

                persistedNewsId = res.id;
            }

            if (persistedNewsId) {
                if (form.getFieldState("headerImage").isDirty) {
                    await uploadNewsFileAction(
                        persistedNewsId,
                        "header",
                        serializeFileData(values.headerImage)
                    );
                }

                if (
                    form.getFieldState("content").isDirty &&
                    (values.contentImages?.length ?? 0 > 0)
                ) {
                    await updateContentImages(
                        persistedNewsId,
                        values.content,
                        values.contentImages!
                    );
                }

                if (
                    form.getFieldState("attachments").isDirty &&
                    (values.attachments?.length ?? 0 > 0)
                ) {
                    updateAttachments(persistedNewsId, values.attachments!);
                }
            }
            router.push(`/news/${persistedNewsId}`);
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
