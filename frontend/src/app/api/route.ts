import { NextRequest, NextResponse } from 'next/server'

const keepHeaders: string[] = [
    'content-type',
    'content-length',
    'content-disposition',
    'cache-control',
]

/**
 * A simple proxy route which passes requests directly to the backend.
 *
 * @param req The incoming request. A `url` query parameter is required.
 * @returns The backend response with some headers filtered out.
 */
export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url')
    if (url === null) {
        return new NextResponse('invalid url', {
            status: 400,
        })
    }

    // allow proxy requests to the backend only
    if (! url.startsWith(process.env.API_URL as string)) {
        return new NextResponse('invalid url', {
            status: 400,
        })
    }

    const response = await fetch(url, {
        headers: req.headers,
    })

    const responseHeaders = Array.from(response.headers.entries())
        .filter(([header]) => keepHeaders.includes(header))

    return new Response(response.body, {
        status: response.status,
        headers: responseHeaders,
    })
}
