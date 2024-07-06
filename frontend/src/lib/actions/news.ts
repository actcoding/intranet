"use server";

const news: News[][] = [
    [
        {
            id: 1,
            title: "Hello, World!",
            content: "This is my first news.",
            publishedAt: "2024-01-01",
        },
        {
            id: 2,
            title: "Second News",
            content: "This is my second news.",
            publishedAt: "2022-01-02",
        },
        {
            id: 3,
            title: "Third News",
            content: "This is my third news.",
            publishedAt: "2022-01-03",
        },
        {
            id: 4,
            title: "Fourth News",
            content: "This is my fourth news.",
            publishedAt: "2022-01-04",
        },
        {
            id: 5,
            title: "Fifth News",
            content: "This is my fifth news.",
            publishedAt: "2022-01-05",
        },
        {
            id: 6,
            title: "Sixth News",
            content: "This is my sixth news.",
            publishedAt: "2022-01-06",
        },
    ],
    [
        {
            id: 7,
            title: "Seventh News",
            content: "This is my seventh news.",
            publishedAt: "2022-01-07",
        },
        {
            id: 8,
            title: "Eighth News",
            content: "This is my eighth news.",
            publishedAt: "2022-01-08",
        },
        {
            id: 9,
            title: "Ninth News",
            content: "This is my ninth news.",
            publishedAt: "2022-01-09",
        },
        {
            id: 10,
            title: "Tenth News",
            content: "This is my tenth news.",
            publishedAt: "2022-01-10",
        },
        {
            id: 11,
            title: "Eleventh News",
            content: "This is my eleventh news.",
            publishedAt: "2022-01-11",
        },
        {
            id: 12,
            title: "Twelfth News",
            content: "This is my twelfth news.",
            publishedAt: "2022-01-12",
        },
    ],
    [
        {
            id: 13,
            title: "Thirteenth News",
            content: "This is my thirteenth news.",
            publishedAt: "2022-01-13",
        },
        {
            id: 14,
            title: "Fourteenth News",
            content: "This is my fourteenth news.",
            publishedAt: "2022-01-14",
        },
        {
            id: 15,
            title: "Fifteenth News",
            content: "This is my fifteenth news.",
            publishedAt: "2022-01-15",
        },
        {
            id: 16,
            title: "Sixteenth News",
            content: "This is my sixteenth news.",
            publishedAt: "2022-01-16",
        },
        {
            id: 17,
            title: "Seventeenth News",
            content: "This is my seventeenth news.",
            publishedAt: "2022-01-17",
        },
        {
            id: 18,
            title: "Eighteenth News",
            content: "This is my eighteenth news.",
            publishedAt: "2022-01-18",
        },
    ],
];

export async function fetchNews(page: number): Promise<News[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate database lookup delay
    return news[page - 1];
}
