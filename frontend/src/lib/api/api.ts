import { Configuration, NewsApi } from "@/lib/api/generated";

const configuration = new Configuration({
    basePath: process.env.API_URL,
});

export const newsApi = new NewsApi(configuration);
