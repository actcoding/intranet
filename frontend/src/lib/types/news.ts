type News = {
    id: number;
    created_at: string;
    published_at?: string;
    updated_at: string;
    status: "draft" | "published";
    title: string;
    content: string;
    header_image?: string;
};
