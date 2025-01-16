/**
 * @param {import("next").NextConfig} original
 */
export default function makeConfig(original) {
    const copy = Object.assign({}, original)

    const apiUrl = new URL(process.env.API_URL)
    copy.images.remotePatterns = [
        {
            protocol: apiUrl.protocol.substring(0, 4),
            hostname: apiUrl.hostname,
            port: apiUrl.port,
            pathname: '/storage/**',
        },
    ]

    return copy
}
