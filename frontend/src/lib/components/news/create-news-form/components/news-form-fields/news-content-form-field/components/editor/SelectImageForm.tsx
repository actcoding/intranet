import { Button } from "@/lib/components/common/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/lib/components/common/Form";
import FileImagePreview from "@/lib/components/shared/FileImagePreview";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    image: z.instanceof(File),
});

interface SelectImageFormProps {
    onSubmit: (data: z.infer<typeof formSchema>) => void;
}

const SelectImageForm = (props: SelectImageFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const [filePreview, setFilePreview] = useState<File | null>(null);
    function handleImagePreviewChange(files: File[] | null) {
        if (!files) {
            setFilePreview(null);
            return;
        }
        const file = files[0];
        if (file) {
            const validation = formSchema.safeParse({
                image: file,
            });
            if (validation.success) {
                setFilePreview(file);
                form.clearErrors("image");
            } else {
                setFilePreview(null);
                form.setError("image", validation.error.errors[0]);
            }
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={(e) => {
                    e.stopPropagation();
                }}
                className="flex gap-2"
            >
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                            <FormControl>
                                <FileSelector
                                    onChange={(file) => {
                                        form.setValue("image", file[0]);
                                        form.handleSubmit(props.onSubmit)();
                                    }}
                                    onPreviewChange={handleImagePreviewChange}
                                    {...rest}
                                >
                                    <FileSelectorTrigger asChild>
                                        <Button variant={"ghost"} size={"icon"}>
                                            <ImageIcon size={20} />
                                        </Button>
                                    </FileSelectorTrigger>
                                    <FileSelectorContent>
                                        <FileSelectorHeader>
                                            <FileSelectorTitle>
                                                Bild wählen
                                            </FileSelectorTitle>
                                        </FileSelectorHeader>
                                        <FileSelectorBody>
                                            <FileSelectorInput />
                                            {filePreview && (
                                                <FileImagePreview
                                                    image={filePreview}
                                                />
                                            )}
                                        </FileSelectorBody>
                                        <FileSelectorFooter />
                                    </FileSelectorContent>
                                </FileSelector>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};
export default SelectImageForm;
