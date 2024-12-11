import '@/app/globals.css'
import { Toaster } from '@/lib/components/common/Toaster'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Intranet',
    authors: {
        name: 'act coding GbR',
        url: 'https://act-coding.de/',
    },
    robots: {
        index: false,
        follow: false,
    },
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale()

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider locale={locale}>
                    {children}

                    <Toaster />
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
