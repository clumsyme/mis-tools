import * as vscode from 'vscode'
import { addMisButton } from './startModules'
import { addToolButton } from './tools'

const window = vscode.window

export function activate(context: vscode.ExtensionContext) {
    addMisButton(context)
    addToolButton(context)
}

// this method is called when your extension is deactivated
export function deactivate() {}
