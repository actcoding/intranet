import { useTranslations } from "next-intl";

interface NewsStatusBadgeProps {
    status: News["status"];
}
const NewsStatusBadge = (props: NewsStatusBadgeProps) => {
    const t = useTranslations("News");
    switch (props.status) {
        case "published":
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
        default:
            return null;
    }
};
export default NewsStatusBadge;
