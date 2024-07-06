import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/lib/components/common/Card";

interface PostPreviewCardProps extends Post {}
const PostPreviewCard = (props: PostPreviewCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
            </CardHeader>
            <CardContent>{props.content}</CardContent>
        </Card>
    );
};
export default PostPreviewCard;
