import { Button } from "@/lib/components/common/Button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/lib/components/common/Form";
import { Input } from "@/lib/components/common/Input";
import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogClose,
    ResponsiveDialogContent,
    ResponsiveDialogFooter,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from "@/lib/components/common/ResponsiveDialog";
import { UploadButtonContent } from "@/lib/components/news/create-news-form/components/shared/UploadButtonContent";
import { allowedFileTypes } from "@/lib/components/news/create-news-form/CreateNewsForm.config";
import { CreateNewsForm } from "@/lib/components/news/create-news-form/CreateNewsForm.models";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface NewsHeaderImageFormFieldProps {
    form: CreateNewsForm;
}

const NewsHeaderImageFormField = (props: NewsHeaderImageFormFieldProps) => {
    const [selectedFilePreview, setSelectedFilePreview] = useState<File | null>(
        null
    );

    async function handleHeaderImageChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];
        if (file) {
            props.form.setValue("headerImage", file);
            const isValid = await props.form.trigger("headerImage");
            if (!isValid) {
                props.form.resetField("headerImage", {
                    keepDirty: true,
                    keepError: true,
                    keepTouched: true,
                });
            } else {
                setSelectedFilePreview(file);
            }
        }
    }

    function handleDialogOpenChange(open: boolean) {
        if (!open) {
            setSelectedFilePreview(null);
        }
    }

    return (
        <FormField
            control={props.form.control}
            name="headerImage"
            render={({ field: { onChange, value, ...rest } }) => (
                <>
                    <ResponsiveDialog onOpenChange={handleDialogOpenChange}>
                        <UploadButtonContent selectedFile={value} />
                        <ResponsiveDialogContent>
                            <ResponsiveDialogHeader>
                                <ResponsiveDialogTitle>
                                    Titelbild ändern
                                </ResponsiveDialogTitle>
                            </ResponsiveDialogHeader>
                            <ResponsiveDialogBody>
                                <FormItem>
                                    <FormLabel className="sr-only">
                                        Titelbild
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="mb-2"
                                            onChange={handleHeaderImageChange}
                                            type="file"
                                            accept={allowedFileTypes.headerImage
                                                .map((type) => `.${type}`)
                                                .join(", ")}
                                            {...rest}
                                        />
                                    </FormControl>

                                    {selectedFilePreview && (
                                        <div className="relative h-[200px]">
                                            <Image
                                                src={URL.createObjectURL(
                                                    selectedFilePreview
                                                )}
                                                alt="Header image"
                                                className="rounded-lg"
                                                objectFit="cover"
                                                fill
                                            />
                                        </div>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            </ResponsiveDialogBody>
                        </ResponsiveDialogContent>
                    </ResponsiveDialog>
                    <FormMessage />
                </>
            )}
        />
    );
};

export { NewsHeaderImageFormField };
