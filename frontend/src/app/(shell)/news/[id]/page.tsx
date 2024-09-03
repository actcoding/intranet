import { newsApi } from "@/lib/api/api";
import { Avatar, AvatarFallback } from "@/lib/components/common/Avatar";
import FileListPreview from "@/lib/components/shared/FileListPreview";
import NewsStatusBadge from "@/lib/components/shared/NewsStatusBadge";
import SanitizedHTMLContent from "@/lib/components/shared/SanitizedHTMLContent";
import { cn } from "@/lib/utils";
import { getFormatter } from "next-intl/server";
import Image from "next/image";

interface Props {
    params: {
        id: string;
    };
}

const SingleNewsPage = async (props: Props) => {
    const news = await newsApi.newsShow({ id: props.params.id });
    const format = await getFormatter();
    console.log(JSON.stringify(news.content));
    return (
        <div className="max-w-[800px] mx-auto h-full">
            <div
                className={cn(
                    "mb-6 rounded-lg overflow-hidden",
                    news.headerImage && "h-[400px] relative"
                )}
            >
                {news.headerImage && (
                    <Image
                        src={news.headerImage}
                        alt={news.title}
                        layout="fill"
                        objectFit="cover"
                    />
                )}
                <div
                    className={cn(
                        "flex flex-col gap-3 justify-end items-start",
                        news.headerImage &&
                            "bg-black bg-opacity-50 absolute inset-0 text-white p-6"
                    )}
                >
                    {news.status === "draft" && (
                        <NewsStatusBadge status={news.status} />
                    )}

                    <h1 className="text-4xl font-bold mb-2">{news.title}</h1>

                    <div className="flex items-center gap-2">
                        <Avatar className="text-black">
                            <AvatarFallback>
                                {news.author.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <span>{news.author.name}</span>
                        {news.publishedAt && (
                            <span className="opacity-70">
                                {format.relativeTime(
                                    Date.parse(news.publishedAt)
                                )}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <SanitizedHTMLContent
                content={news.content}
                allowedTags={[
                    "p",
                    "strong",
                    "em",
                    "a",
                    "ul",
                    "ol",
                    "li",
                    "img",
                ]}
            />
        </div>
    );
};

export default SingleNewsPage;
