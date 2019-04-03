import * as vscode from 'vscode'
import { execSync } from 'child_process'
import { onFormat } from './format'

const window = vscode.window

export function addToolButton(context: vscode.ExtensionContext) {
    let toolBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 101)
    toolBarItem.text = '$(tools) 跳房子工具'
    toolBarItem.command = 'misTools.selectTools'
    toolBarItem.show()

    context.subscriptions.push(toolBarItem)
    context.subscriptions.push(
        vscode.commands.registerCommand('misTools.selectTools', onSelectTools),
    )
}

function onSelectTools() {
    let quickPick = window.createQuickPick()

    quickPick.items = [
        {
            label: '格式化当前文件',
            detail: 'format',
        },
    ]
    quickPick.onDidAccept(function() {
        let selectedItem = quickPick.activeItems[0]
        if (selectedItem) {
            if (selectedItem.detail === 'format') {
                onFormat()
                quickPick.dispose()
            }
        }
    })

    quickPick.show()
}
