import { Button } from "@/lib/components/common/Button";
import { ResponsiveDialogTrigger } from "@/lib/components/common/ResponsiveDialog";
import { UploadIcon } from "lucide-react";
import Image from "next/image";

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

export { UploadButtonContent };
