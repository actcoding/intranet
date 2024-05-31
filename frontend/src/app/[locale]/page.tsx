import { getAppSession } from "@/app/actions";
import LogoutButton from "@/lib/components/auth/LogoutButton";
import { Button } from "@/lib/components/common/Button";
import { redirect } from "next/navigation";

export default async function Home() {
    const { sessionData } = await getAppSession();

    if (!sessionData) {
        return redirect("/de/auth/login");
    }

    return (
        <div>
            <p>MEGA GEIL</p>

            <p>{sessionData.user.name}</p>

            <LogoutButton />
        </div>
    );
}
