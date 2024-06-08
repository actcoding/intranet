import { Button } from "@/lib/components/common/Button";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

interface SidebarFooterProps {
    loggedInUser?: User;
}

const SidebarFooter = (props: SidebarFooterProps) => {
    if (props.loggedInUser) {
        return <div>{props.loggedInUser.email}</div>;
    } else {
        return (
            <Button className="w-full" variant={"outline"} asChild>
                <Link href={"/auth/login"}>
                    <LogInIcon className="mr-2" size={20} />
                    Creator-Login
                </Link>
            </Button>
        );
    }
};
export default SidebarFooter;
