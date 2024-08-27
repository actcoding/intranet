import { Button } from "@/lib/components/common/Button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/lib/components/common/Form";
import { createNewsFormSchema } from "@/lib/components/news/create-news-form/CreateNewsForm.config";
import { CreateNewsForm } from "@/lib/components/news/create-news-form/CreateNewsForm.models";
import FileListPreview from "@/lib/components/shared/FileListPreview";
import {
    FileSelector,
    FileSelectorBody,
    FileSelectorContent,
    FileSelectorFooter,
    FileSelectorHeader,
    FileSelectorInput,
    FileSelectorTitle,
    FileSelectorTrigger,
} from "@/lib/components/shared/FileSelector";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface NewsAttachmentsFormFieldProps {
    form: CreateNewsForm;
}

const NewsAttachmentsFormField = (props: NewsAttachmentsFormFieldProps) => {
    const [filesPreview, setFilesPreview] = useState<File[] | null>(null);

    function handleAttachmentsChange(files: File[] | null) {
        if (!files) {
            setFilesPreview(null);
            return;
        }
        const combinedFiles = props.form
            .getValues("attachments")
            ?.concat(files);
        if (combinedFiles) {
            const validation = createNewsFormSchema.safeParse({
                ...props.form.getValues(),
                attachments: combinedFiles,
            });
            if (validation.success) {
                setFilesPreview(files);
                props.form.clearErrors("attachments");
            } else {
                setFilesPreview(null);
                props.form.setError("attachments", validation.error.errors[0]);
            }
        }
    }

    function handleFilesSelectionConfirm(files: File[]) {
        props.form.setValue(
            "attachments",
            props.form.getValues("attachments")?.concat(files)
        );
    }

    return (
        <FormField
            control={props.form.control}
            name="attachments"
            render={({ field: { onChange, value, ...rest } }) => (
                <>
                    <FormItem>
                        <FormLabel className="sr-only">Anhänge</FormLabel>
                        <FormControl>
                            <FileSelector
                                onChange={handleFilesSelectionConfirm}
                                onPreviewChange={handleAttachmentsChange}
                                multiple
                                {...rest}
                            >
                                <FileSelectorTrigger asChild>
                                    <Button variant={"outline"}>
                                        <PlusIcon size={16} className="mr-2" />
                                        Anhänge hinzufügen
                                    </Button>
                                </FileSelectorTrigger>
                                <FileSelectorContent>
                                    <FileSelectorHeader>
                                        <FileSelectorTitle>
                                            Anhänge hinzufügen
                                        </FileSelectorTitle>
                                    </FileSelectorHeader>
                                    <FileSelectorBody>
                                        <FileSelectorInput />
                                        {filesPreview && (
                                            <FileListPreview
                                                files={filesPreview}
                                            />
                                        )}
                                    </FileSelectorBody>
                                    <FileSelectorFooter />
                                </FileSelectorContent>
                            </FileSelector>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    {value && (
                        <FileListPreview
                            files={value}
                            display="grid"
                            onRemove={(file) =>
                                onChange(
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
