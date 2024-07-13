"server-only";

import { getAppSession } from "@/lib/actions/auth";
import { Configuration, NewsApi } from "@/lib/api/generated";

const configuration = new Configuration({
    basePath: process.env.API_URL,
    fetchApi: async (input, init) => {
        const { access_token } = await getAppSession();
        return fetch(input, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${access_token}`,
                ...init?.headers,
            },
            ...init,
        });
    },
});

export const newsApi = new NewsApi(configuration);
