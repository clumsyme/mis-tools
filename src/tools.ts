import * as vscode from 'vscode'
import { onFormat } from './format'
import { onSelectProxy, onCustomProxy, getCurrentProxy } from './proxyConfig'


const window = vscode.window

let toolBarItem: vscode.StatusBarItem
export function addToolButton(context: vscode.ExtensionContext) {
    toolBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 101)
    updateToolBarText()
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
}


export function updateToolBarText() {
    let currentProxyName = getCurrentProxy().currentProxyName
    let currentProxyIP = getCurrentProxy().currentProxyIP
    toolBarItem.text = `$(tools) 跳房子工具(虚拟机：${currentProxyName})`
    toolBarItem.tooltip = currentProxyIP
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
            }
        }
    })

    quickPick.show()
}
