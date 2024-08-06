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
    ResponsiveDialogContent,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from "@/lib/components/common/ResponsiveDialog";
import { CreateNewsForm } from "@/lib/components/news/create-news-form/CreateNewsForm.models";
import FileListPreview from "@/lib/components/shared/FileListPreview";
import { useState } from "react";

interface NewsAttachmentsFormFieldProps {
    form: CreateNewsForm;
}

const NewsAttachmentsFormField = (props: NewsAttachmentsFormFieldProps) => {
    const [selectedFilesPreview, setSelectedFilesPreview] = useState<
        File[] | null
    >(null);

    async function handleAttachmentsChange(newFiles: FileList | File[] | null) {
        if (newFiles) {
            const filesArray = Array.from(newFiles);
            props.form.setValue("attachments", filesArray);
            const isValid = await props.form.trigger("attachments");
            if (!isValid) {
                props.form.resetField("attachments", {
                    keepDirty: true,
                    keepError: true,
                    keepTouched: true,
                });
            } else {
                setSelectedFilesPreview(filesArray);
            }
        }
    }

    function handleDialogOpenChange(open: boolean) {
        if (!open) {
            setSelectedFilesPreview(null);
        }
    }

    return (
        <FormField
            control={props.form.control}
            name="attachments"
            render={({ field: { onChange, value, ...rest } }) => (
                <>
                    <ResponsiveDialog onOpenChange={handleDialogOpenChange}>
                        <ResponsiveDialogTrigger>
                            upload
                        </ResponsiveDialogTrigger>
                        <ResponsiveDialogContent>
                            <ResponsiveDialogHeader>
                                <ResponsiveDialogTitle>
                                    Anhänge ändern
                                </ResponsiveDialogTitle>
                            </ResponsiveDialogHeader>
                            <ResponsiveDialogBody>
                                <FormItem>
                                    <FormLabel className="sr-only">
                                        Anhänge
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="mb-2"
                                            onChange={(e) =>
                                                handleAttachmentsChange(
                                                    e.target.files
                                                )
                                            }
                                            type="file"
                                            multiple
                                            {...rest}
                                        />
                                    </FormControl>
                                    {selectedFilesPreview && (
                                        <FileListPreview
                                            files={selectedFilesPreview}
                                        />
                                    )}
                                    <FormMessage />
                                </FormItem>
                            </ResponsiveDialogBody>
                        </ResponsiveDialogContent>
                    </ResponsiveDialog>
                    <FormMessage />
                    {value && (
                        <FileListPreview
                            files={value}
                            display="grid"
                            onRemove={(file) =>
                                handleAttachmentsChange(
                                    value.filter((e) => e.name !== file.name)
                                )
                            }
                        />
                    )}
                </>
            )}
        />
    );
};
export { NewsAttachmentsFormField };
