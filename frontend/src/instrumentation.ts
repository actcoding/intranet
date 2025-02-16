type InitFunction = () => void | Promise<void>

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const funcs: InitFunction[] = [
            await import('./boot/log'),
        ].map(f => f.default)

        for await (const func of funcs) {
            await func()
        }
    }
}
