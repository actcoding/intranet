"use client";
import { useRouter } from "next/navigation";
import { Button } from "../common/Button";
import { useCallback } from "react";
import { handleLogout } from "@/app/actions";

interface LogoutButtonProps {}
const LogoutButton = (props: LogoutButtonProps) => {
    const router = useRouter();

    const logout = useCallback(async () => {
        const res = await handleLogout();
        if (res === undefined) {
            router.push("/de/auth/login");
        }
    }, [router]);

    return (
        <Button onClick={logout} variant="destructive">
            Abmelden
        </Button>
    );
};
export default LogoutButton;
