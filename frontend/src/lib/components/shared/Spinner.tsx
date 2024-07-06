import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

interface SpinnerProps {
    className?: string;
    size?: number;
}
const Spinner = (props: SpinnerProps) => {
    return (
        <Loader2Icon
            className={cn("animate-spin", props.className)}
            size={props.size}
        />
    );
};
export default Spinner;
