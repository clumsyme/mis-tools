import * as net from 'net'
import * as vscode from 'vscode'
import { showTerminal } from './utils'

const { env, Uri } = vscode

export function onStartJserver() {
    let terminal = showTerminal('jserver')
    terminal.sendText('npm run jserver')

    const MAX_TRY = 10
    let tryCount = 0

    let client = net.createConnection({port: 9093})
    client.on('error', (err) => {
        if (tryCount++ < MAX_TRY) {
            setTimeout(() => {
                client.connect({port: 9093})
            }, 1000)
        } else {
            client.destroy()
        }
    })
    client.on('connect', () => {
        let target = Uri.parse('http://localhost:9093')
        env.openExternal(target)
        client.destroy()
    })
}
