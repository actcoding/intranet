import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/lib/components/common/Card";
import Image from "next/image";

interface PostPreviewCardProps extends Post {}
const PostPreviewCard = (props: PostPreviewCardProps) => {
    return (
        <Card className="flex flex-row">
            {props.imageUrl && (
                <Image
                    src={props.imageUrl}
                    alt={props.title}
                    width={200}
                    height={200}
                    className="m-4 mr-0 rounded-sm"
                />
            )}
            <div>
                <CardHeader>
                    <CardTitle>{props.title}</CardTitle>
                </CardHeader>
                <CardContent>{props.content}</CardContent>
            </div>
        </Card>
    );
};
export default PostPreviewCard;
