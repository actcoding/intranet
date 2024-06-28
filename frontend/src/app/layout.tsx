import "@/app/globals.css";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Intranet",
    authors: {
        name: "act coding GbR",
        url: "https://act-coding.de/",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();

    return (
        <html lang={locale}>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
