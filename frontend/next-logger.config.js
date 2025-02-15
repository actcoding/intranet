const pino = require('pino')

/**
 * Transforms an input string to SCREAMING_SNAKE_CASE
 *
 * @param {string} str
 * @returns The transformed string.
 */
function toScreamingSnakeCase(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ' ')
        .split(' ')
        .filter(Boolean)
        .map((word) => word.toUpperCase())
        .join('_')
}

const targets = (process.env.LOG_CHANNEL ?? 'pino-pretty').split(',')

const logger = defaultConfig =>
    pino({
        ...defaultConfig,
        mixin: () => ({ name: 'frontend' }),
        level: process.env.LOG_LEVEL || 'info',
        transport: {
            targets: targets.map(target => {
                let options = {}

                const optsString = process.env[`LOG_CHANNEL_${toScreamingSnakeCase(target)}`]
                if (optsString) {
                    options = JSON.parse(optsString)
                }

                return { target, options }
            }),
        },
    })

module.exports = {
    logger,
}
