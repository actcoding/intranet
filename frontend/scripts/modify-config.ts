import { log } from 'node:console'
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs'

const fileSource = '.next/standalone/server.js'
const fileBackup = `${fileSource}.bak`
if (!existsSync(fileBackup)) {
    cpSync(fileSource, fileBackup)
}

const contents = readFileSync(fileBackup)
const input = contents.toString('utf-8')
const lines = input.split('\n')

// add import
let lastImportLine = 0
for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('import')) {
        lastImportLine = i
        continue
    }
}
lines.splice(lastImportLine + 1, 0, 'import makeConfig from \'./make-config.js\'')

// modify config statement
let configLine = 0
for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('const nextConfig')) {
        configLine = i
        continue
    }
}

const config = /(?:const\s+nextConfig\s*=\s*)(?<config>.*)/gm.exec(lines[configLine])
lines[configLine] = `const nextConfig = makeConfig(${config?.groups?.config})`

writeFileSync(fileSource, lines.join('\n'))
log(' >> Modified Next.js default server.js')

cpSync('buildSrc/make-config.js', '.next/standalone/make-config.js', { force: true })
log(' >> Installed config modification script')
