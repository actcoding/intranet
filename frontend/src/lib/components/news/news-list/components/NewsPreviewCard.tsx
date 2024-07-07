import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/lib/components/common/Card";
import { NewspaperIcon } from "lucide-react";
import { useFormatter } from "next-intl";
import Image from "next/image";

interface NewsPreviewCardProps extends News {}
const NewsPreviewCard = (props: NewsPreviewCardProps) => {
    const format = useFormatter();
    return (
        <Card className="overflow-hidden relative">
            {props.headerImage ? (
                <div className="relative w-full h-[200px]">
                    <Image
                        src={props.headerImage}
                        alt={props.title}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            ) : (
                <div className="w-full h-[200px] bg-primary/15 flex items-center justify-center">
                    <NewspaperIcon className="text-primary" size={50} />
                </div>
            )}

            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
            </CardHeader>
            <CardContent>{props.content}</CardContent>
            <CardFooter>
                <p className="text-muted-foreground">
                    {format.relativeTime(Date.parse(props.publishedAt))}
                </p>
            </CardFooter>
        </Card>
    );
};
export default NewsPreviewCard;
