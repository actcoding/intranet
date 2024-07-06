"use server";

const news: News[][] = [
    [
        {
            id: 1,
            title: "Hello, World!",
            content: "This is my first news.",
        },
        {
            id: 2,
            title: "Second News",
            content: "This is my second news.",
        },
        {
            id: 3,
            title: "Third News",
            content: "This is my third news.",
        },
        {
            id: 4,
            title: "Fourth News",
            content: "This is my fourth news.",
        },
        {
            id: 5,
            title: "Fifth News",
            content: "This is my fifth news.",
        },
    ],
    [
        {
            id: 6,
            title: "Sixth News",
            content: "This is my sixth news.",
        },
        {
            id: 7,
            title: "Seventh News",
            content: "This is my seventh news.",
        },
        {
            id: 8,
            title: "Eighth News",
            content: "This is my eighth news.",
        },
        {
            id: 9,
            title: "Ninth News",
            content: "This is my ninth news.",
        },
        {
            id: 10,
            title: "Tenth News",
            content: "This is my tenth news.",
        },
    ],
    [
        {
            id: 11,
            title: "Eleventh News",
            content: "This is my eleventh news.",
        },
        {
            id: 12,
            title: "Twelfth News",
            content: "This is my twelfth news.",
        },
        {
            id: 13,
            title: "Thirteenth News",
            content: "This is my thirteenth news.",
        },
        {
            id: 14,
            title: "Fourteenth News",
            content: "This is my fourteenth news.",
        },
        {
            id: 15,
            title: "Fifteenth News",
            content: "This is my fifteenth news.",
        },
    ],
    [
        {
            id: 16,
            title: "Sixteenth News",
            content: "This is my sixteenth news.",
        },
        {
            id: 17,
            title: "Seventeenth News",
            content: "This is my seventeenth news.",
        },
        {
            id: 18,
            title: "Eighteenth News",
            content: "This is my eighteenth news.",
        },
        {
            id: 19,
            title: "Nineteenth News",
            content: "This is my nineteenth news.",
        },
        {
            id: 20,
            title: "Twentieth News",
            content: "This is my twentieth news.",
        },
    ],
];

export async function fetchNews(page: number): Promise<News[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate database lookup delay
    return news[page - 1];
}
