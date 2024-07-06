import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/lib/components/common/Card";
import Image from "next/image";

interface NewsPreviewCardProps extends News {}
const NewsPreviewCard = (props: NewsPreviewCardProps) => {
    return (
        <Card className="overflow-hidden relative">
            {props.imageUrl && (
                <div className="relative w-full h-[200px]">
                    <Image
                        src={props.imageUrl}
                        alt={props.title}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            )}

            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
            </CardHeader>
            <CardContent>{props.content}</CardContent>
        </Card>
    );
};
export default NewsPreviewCard;
