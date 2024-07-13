import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/lib/components/common/Card";
import RenderedEditorContent from "@/lib/components/shared/RenderedEditorContent";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { NewspaperIcon } from "lucide-react";
import { useFormatter } from "next-intl";
import Image from "next/image";

interface NewsPreviewCardProps extends News {
    headerImagePosition?: "top" | "left";
}

const NewsPreviewCard = ({
    headerImagePosition = "top",
    ...props
}: NewsPreviewCardProps) => {
    const format = useFormatter();

    return (
        <Card
            className={cn(
                headerImagePosition === "left" && "flex",
                "overflow-hidden relative"
            )}
        >
            <NewsPreviewCardHeaderImage
                src={props.header_image}
                alt={props.title || "News"}
                position={headerImagePosition}
            />
            <div>
                <CardHeader>
                    <CardTitle>{props.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <RenderedEditorContent
                        content={JSON.parse(props.content)}
                    />
                </CardContent>
                <CardFooter>
                    <p className="text-muted-foreground">
                        {props.created_at &&
                            format.relativeTime(Date.parse(props.created_at))}
                    </p>
                </CardFooter>
            </div>
        </Card>
    );
};

interface NewsPreviewCardHeaderImageProps {
    src?: string;
    alt: string;
    position?: "top" | "left";
}

const NewsPreviewCardHeaderImage = (props: NewsPreviewCardHeaderImageProps) => {
    const headerImageVariants = cva("relative", {
        variants: {
            position: {
                top: "h-[200px]",
                left: "w-[200px]",
            },
        },
        defaultVariants: {
            position: "top",
        },
    });

    if (props.src) {
        return (
            <div className={headerImageVariants({ position: props.position })}>
                <Image
                    src={props.src}
                    alt={props.alt}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        );
    } else {
        return (
            <div
                className={cn(
                    headerImageVariants({ position: props.position }),
                    "bg-primary/15 flex items-center justify-center"
                )}
            >
                <NewspaperIcon className="text-primary" size={50} />
            </div>
        );
    }
};

export default NewsPreviewCard;
