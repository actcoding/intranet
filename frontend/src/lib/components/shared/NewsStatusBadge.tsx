import { News, NewsStatus } from "@/lib/api/generated";
import { useTranslations } from "next-intl";

interface NewsStatusBadgeProps {
    status: NewsStatus;
}
const NewsStatusBadge = (props: NewsStatusBadgeProps) => {
    const t = useTranslations("News");
    switch (props.status) {
        case "active":
            return (
                <span className="px-2 py-0.5 rounded-full text-xs bg-green-300 text-success-contrast">
                    {t("news-status-published")}
                </span>
            );
        case "draft":
            return (
                <span className="px-2 py-0.5 rounded-full text-xs bg-slate-300 text-warning-contrast">
                    {t("news-status-draft")}
                </span>
            );
        case "deleted":
            return (
                <span className="px-2 py-0.5 rounded-full text-xs bg-red-300 text-error-contrast">
                    {t("news-status-deleted")}
                </span>
            );
        default:
            return null;
    }
};
export default NewsStatusBadge;
