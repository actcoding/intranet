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
import Image from "next/image";
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
import { Button } from "@/lib/components/common/Button";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { Card } from "@/lib/components/common/Card";

interface NewsHeaderImageFormFieldProps {
    form: UseFormReturn<Zod.infer<typeof createNewsFormSchema>>;
}

const NewsHeaderImageFormField = (props: NewsHeaderImageFormFieldProps) => {
    async function handleChange(
        event: React.ChangeEvent<HTMLInputElement>,
        callback: (file: File | null) => void
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
            }
        }
    }

    return (
        <FormField
            control={props.form.control}
            name="headerImage"
            render={({ field: { onChange, value, ...rest } }) => (
                <>
                    <ResponsiveDialog>
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
                                            onChange={(e) =>
                                                handleChange(e, onChange)
                                            }
                                            type="file"
                                            {...rest}
                                        />
                                    </FormControl>

                                    {value && (
                                        <div className="relative h-[200px]">
                                            <Image
                                                src={URL.createObjectURL(value)}
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
                            <ResponsiveDialogFooter>
                                <ResponsiveDialogClose asChild>
                                    <Button
                                        type="button"
                                        disabled={
                                            props.form.getFieldState(
                                                "headerImage"
                                            ).invalid ||
                                            !props.form.getValues("headerImage")
                                        }
                                    >
                                        Save
                                    </Button>
                                </ResponsiveDialogClose>
                            </ResponsiveDialogFooter>
                        </ResponsiveDialogContent>
                    </ResponsiveDialog>
                </>
            )}
        />
    );
};

interface UploadButtonContentProps {
    selectedFile?: File;
}

const UploadButtonContent = (props: UploadButtonContentProps) => {
    if (props.selectedFile) {
        return (
            <div className="flex items-center gap-2">
                <div className="relative h-[50px] w-[50px]">
                    <Image
                        src={URL.createObjectURL(props.selectedFile)}
                        alt="Header image"
                        className="rounded-lg"
                        objectFit="cover"
                        fill
                    />
                </div>
                {props.selectedFile.name}
                <ResponsiveDialogTrigger asChild>
                    <Button variant={"outline"}>Bild ändern</Button>
                </ResponsiveDialogTrigger>
            </div>
        );
    } else {
        return (
            <ResponsiveDialogTrigger asChild>
                <Button variant={"outline"}>
                    <UploadIcon size={16} className="mr-2" />
                    <span>Datei auswählen</span>
                </Button>
            </ResponsiveDialogTrigger>
        );
    }
};

export default NewsHeaderImageFormField;
