import chalk from 'chalk'
import { formatRFC3339 } from 'date-fns'
import { mkdir, writeFile } from 'fs/promises'
import { dirname } from 'path'
import { inspect, stripVTControlCharacters } from 'util'

type LoggerConfig = {
    name: string
}

type Transport = (message: string) => Promise<void>
const transports: Transport[] = [
    async (message) => {
        process.stdout.write(message)
    },
    async (message) => {
        const file = 'run/logs/console.log'
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, stripVTControlCharacters(message), {
            flag:  'a',
        })
    },
]

class Logger {

    private config: LoggerConfig

    public constructor(config: LoggerConfig) {
        this.config = config
    }

    private _colorizeLevel(level: string) {
        switch (level.toLowerCase()) {
            case 'debug':
                return chalk.blue.bold(level)
            case 'info':
                return chalk.cyan.bold(level)
            case 'warn':
                return chalk.yellow.bold(level)
            case 'error':
                return chalk.red.bold(level)
            default:
                return level
        }
    }

    private _log(level: string, args: unknown[]) {
        const timestamp = formatRFC3339(new Date())
        const message = args.map(a => {
            if (typeof a === 'object') {
                return inspect(a, false, null, true)
            }
            return a
        }).join(' ').trim()
        const line = [
            chalk.dim(timestamp),
            this._colorizeLevel(level.toUpperCase()),
            chalk.dim('[') + this.config.name + chalk.dim(']'),
            chalk.dim(':') + ' ' + message,
        ].join('\t') + '\n'

        transports.forEach(t => t(line))
    }

    public child(config: Partial<LoggerConfig>) {
        return new Logger({
            ...this.config,
            ...config,
        })
    }

    public info(...args: unknown[]) {
        this._log('info', args)
    }

    public warn(...args: unknown[]) {
        this._log('warn', args)
    }

    public error(...args: unknown[]) {
        this._log('error', args)
    }

    public debug(...args: unknown[]) {
        this._log('debug', args)
    }

}

const logger = new Logger({ name: 'main' })

function patchConsoleLog() {
    const childLogger = logger.child({ name: 'console' })

    console.log = childLogger.info.bind(childLogger)
    console.info = childLogger.info.bind(childLogger)
    console.error = childLogger.error.bind(childLogger)
    console.warn = childLogger.warn.bind(childLogger)
    console.debug = childLogger.debug.bind(childLogger)
    console.trace = childLogger.debug.bind(childLogger)
}

export default function patch() {
    patchConsoleLog()
}
