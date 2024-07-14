"server-only";

import { getAppSession } from "@/lib/actions/auth";
import { AuthApi, Configuration, NewsApi, UserApi } from "@/lib/api/generated";

const configuration = new Configuration({
    basePath: process.env.API_URL,
    accessToken: async () => {
        const { access_token } = await getAppSession();
        return access_token;
    },
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export const newsApi = new NewsApi(configuration);

export const authApi = new AuthApi(configuration);
