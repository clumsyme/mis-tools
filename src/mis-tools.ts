import * as vscode from 'vscode'
import { quickPickItems } from './startModules'
import { addLaunchButton, updateLaunchBarItem } from './launchApp'
import { addToolButton } from './tools'

export function activate(context: vscode.ExtensionContext) {
    addLaunchButton(context)
    addToolButton(context)
}

vscode.workspace.onDidChangeConfiguration(function() {
    updateLaunchBarItem()
})

// this method is called when your extension is deactivated
export function deactivate() {}
