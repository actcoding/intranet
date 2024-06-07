import { LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "@/lib/components/common/Button";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/lib/components/common/Sheet";

interface SidebarButtonProps extends ButtonProps {
    icon?: LucideIcon;
}

export function SidebarButton({
    icon: Icon,
    className,
    children,
    ...props
}: SidebarButtonProps) {
    return (
        <Button
            variant="ghost"
            className={cn("gap-2 justify-start", className)}
            {...props}
        >
            {Icon && <Icon size={20} />}
            <span>{children}</span>
        </Button>
    );
}

export function SidebarButtonSheet(props: SidebarButtonProps) {
    return (
        <SheetClose asChild>
            <SidebarButton {...props} />
        </SheetClose>
    );
}
