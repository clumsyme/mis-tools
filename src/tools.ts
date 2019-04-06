import * as vscode from 'vscode'
import { onFormat } from './format'
import { onSelectProxy, onCustomProxy, getCurrentProxy } from './proxyConfig'
import { onSelectStartModules } from './startModules'


const window = vscode.window

let toolBarItem: vscode.StatusBarItem
export function addToolButton(context: vscode.ExtensionContext) {
    toolBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 101)
    toolBarItem.text = '$(tools) 跳房子工具'
    toolBarItem.command = 'misTools.selectTools'
    toolBarItem.show()

    context.subscriptions.push(toolBarItem)
    context.subscriptions.push(
        vscode.commands.registerCommand('misTools.selectTools', onSelectTools),
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('misTools.selectProxy', onSelectProxy),
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('misTools.customProxy', onCustomProxy),
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('misTools.selectStartModules', onSelectStartModules),
    )
}

function onSelectTools() {
    let quickPick = window.createQuickPick()

    quickPick.items = [
        {
            label: '$(book) 格式化当前文件',
            detail: 'format',
        },
        {
            label: '$(device-desktop) 选择后端虚拟机',
            detail: 'proxy',
        },
        {
            label: '$(file-submodule) 选择默认启动模块',
            detail: 'modules',
        },
    ]
    quickPick.onDidAccept(function() {
        let selectedItem = quickPick.activeItems[0]
        if (selectedItem) {
            if (selectedItem.detail === 'format') {
                onFormat()
                quickPick.dispose()
            } else if (selectedItem.detail === 'proxy') {
                onSelectProxy()
                quickPick.dispose()
            } else if (selectedItem.detail === 'modules') {
                onSelectStartModules()
                quickPick.dispose()
            }
        }
    })

    quickPick.show()
}
