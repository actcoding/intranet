import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/lib/components/common/Card";
import { cn } from "@/lib/utils";
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
                src={props.headerImage}
                alt={props.title}
            />
            <div>
                <CardHeader>
                    <CardTitle>{props.title}</CardTitle>
                </CardHeader>
                <CardContent>{props.content}</CardContent>
                <CardFooter>
                    <p className="text-muted-foreground">
                        {format.relativeTime(Date.parse(props.publishedAt))}
                    </p>
                </CardFooter>
            </div>
        </Card>
    );
};

interface NewsPreviewCardHeaderImageProps {
    src?: string;
    alt: string;
}

const NewsPreviewCardHeaderImage = (props: NewsPreviewCardHeaderImageProps) => {
    if (props.src) {
        return (
            <div className="relative w-full h-[200px]">
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
            <div className="w-full h-[200px] bg-primary/15 flex items-center justify-center">
                <NewspaperIcon className="text-primary" size={50} />
            </div>
        );
    }
};

export default NewsPreviewCard;
