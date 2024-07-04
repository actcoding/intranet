"use server";

const posts: Post[][] = [
    [
        {
            id: 1,
            title: "Hello, World!",
            content: "This is my first post.",
        },
        {
            id: 2,
            title: "Second Post",
            content: "This is my second post.",
        },
        {
            id: 3,
            title: "Third Post",
            content: "This is my third post.",
        },
        {
            id: 4,
            title: "Fourth Post",
            content: "This is my fourth post.",
        },
        {
            id: 5,
            title: "Fifth Post",
            content: "This is my fifth post.",
        },
    ],
    [
        {
            id: 6,
            title: "Sixth Post",
            content: "This is my sixth post.",
        },
        {
            id: 7,
            title: "Seventh Post",
            content: "This is my seventh post.",
        },
        {
            id: 8,
            title: "Eighth Post",
            content: "This is my eighth post.",
        },
        {
            id: 9,
            title: "Ninth Post",
            content: "This is my ninth post.",
        },
        {
            id: 10,
            title: "Tenth Post",
            content: "This is my tenth post.",
        },
    ],
];

export async function fetchPosts(page: number): Promise<Post[] | Error> {
    return posts[page];
}
