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
    [
        {
            id: 11,
            title: "Eleventh Post",
            content: "This is my eleventh post.",
        },
        {
            id: 12,
            title: "Twelfth Post",
            content: "This is my twelfth post.",
        },
        {
            id: 13,
            title: "Thirteenth Post",
            content: "This is my thirteenth post.",
        },
        {
            id: 14,
            title: "Fourteenth Post",
            content: "This is my fourteenth post.",
        },
        {
            id: 15,
            title: "Fifteenth Post",
            content: "This is my fifteenth post.",
        },
    ],
    [
        {
            id: 16,
            title: "Sixteenth Post",
            content: "This is my sixteenth post.",
        },
        {
            id: 17,
            title: "Seventeenth Post",
            content: "This is my seventeenth post.",
        },
        {
            id: 18,
            title: "Eighteenth Post",
            content: "This is my eighteenth post.",
        },
        {
            id: 19,
            title: "Nineteenth Post",
            content: "This is my nineteenth post.",
        },
        {
            id: 20,
            title: "Twentieth Post",
            content: "This is my twentieth post.",
        },
    ],
];

export async function fetchPosts(page: number): Promise<Post[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate database lookup delay
    return posts[page - 1];
}
