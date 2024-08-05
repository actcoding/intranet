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
import { allowedFileTypes } from "@/lib/components/news/create-news-form/CreateNewsForm.config";
import { NewsFormField } from "@/lib/components/news/create-news-form/CreateNewsForm.types";
import FileListPreview from "@/lib/components/shared/FileListPreview";

interface NewsAttachmentsFormFieldProps extends NewsFormField {}

const NewsAttachmentsFormField = (props: NewsAttachmentsFormFieldProps) => {
    async function handleFileChange(newFiles: FileList | File[] | null) {
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
            }
        }
    }

    return (
        <FormField
            control={props.form.control}
            name="attachments"
            render={({ field: { onChange, value, ...rest } }) => (
                <>
                    <ResponsiveDialog>
                        <ResponsiveDialogTrigger>
                            upload
                        </ResponsiveDialogTrigger>
                        <ResponsiveDialogContent>
                            <ResponsiveDialogHeader>
                                <ResponsiveDialogTitle>
                                    Titelbild ändern
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
                                                handleFileChange(e.target.files)
                                            }
                                            type="file"
                                            multiple
                                            {...rest}
                                        />
                                    </FormControl>
                                    {value && <FileListPreview files={value} />}
                                    <FormMessage />
                                </FormItem>
                            </ResponsiveDialogBody>
                            <ResponsiveDialogFooter>
                                <ResponsiveDialogClose asChild>
                                    <Button
                                        type="button"
                                        disabled={
                                            props.form.getFieldState(
                                                "attachments"
                                            ).invalid ||
                                            !props.form.getValues("attachments")
                                        }
                                    >
                                        Save
                                    </Button>
                                </ResponsiveDialogClose>
                            </ResponsiveDialogFooter>
                        </ResponsiveDialogContent>
                    </ResponsiveDialog>
                    <FormMessage />
                    {value && (
                        <FileListPreview
                            files={value}
                            onRemove={(file) =>
                                handleFileChange(
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
export default NewsAttachmentsFormField;
