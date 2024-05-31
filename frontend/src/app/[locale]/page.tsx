import { getAppSession } from "@/app/actions";
import NewsPostForm from "@/lib/components/news-post-form/NewsPostForm";

export default async function Home() {
    const session = await getAppSession();

    return (
        <div>
            <p>MEGA GEIL</p>

            <p>{session.data.user.name}</p>
        </div>
    );
}
