import * as vscode from 'vscode'
import { addLaunchButton } from './launchApp'
import { addToolButton } from './tools'

export function activate(context: vscode.ExtensionContext) {
    addLaunchButton(context)
    addToolButton(context)
}

// this method is called when your extension is deactivated
export function deactivate() {}
