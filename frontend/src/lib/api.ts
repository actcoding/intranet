import { getAppSession } from "@/lib/actions/auth";

export async function apiFetch(url: string, options: RequestInit = {}) {
    const { access_token } = await getAppSession();
    return fetch(process.env.API_URL + url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${access_token}`,
            ...options.headers,
        },
        ...options,
    });
}
