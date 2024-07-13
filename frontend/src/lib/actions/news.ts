"use server";

import { apiFetch } from "@/lib/api";

export async function getNewsListAction({
    page,
    perPage,
}: {
    page: number;
    perPage: number;
}) {
    const res = await apiFetch(`/news?page=${page}&perPage=${perPage}`);
    if (res.ok) {
        return res.json();
    } else {
        return [];
    }
}

export async function createNewsAction(data: any) {
    const res = await apiFetch("/news", {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (res.ok) {
        return res.json();
    } else {
        console.log(res.status);
        return [];
    }
}
