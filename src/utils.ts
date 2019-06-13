import * as vscode from 'vscode'
const window = vscode.window

const workspaceFolders = vscode.workspace.workspaceFolders

export const ROOTPATH = workspaceFolders ? workspaceFolders[0].uri.fsPath : ''

export function showTerminal(terminalName: string) {
    let mainTerminal = window.terminals.filter((terminal) => terminal.name === terminalName)[0]
    if (mainTerminal) {
        mainTerminal.dispose()
    }
    mainTerminal = window.createTerminal(terminalName)
    mainTerminal.show()
    return mainTerminal
}
