import * as vscode from 'vscode'
import { quickPickItems } from './startModules'
import { getCurrentProxy } from './proxyConfig'

const window = vscode.window

const NPM_TREMINAL_NAME = '跳房子'

let launchBarItem: vscode.StatusBarItem
export function addLaunchButton(context: vscode.ExtensionContext) {
    launchBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
    updateLaunchBarItem()
    launchBarItem.command = 'misTools.launchApp'
    launchBarItem.show()

    context.subscriptions.push(launchBarItem)
    context.subscriptions.push(vscode.commands.registerCommand('misTools.launchApp', onLaunchApp))
}

function onLaunchApp() {
    let ternimalCommand = 'npm start'
    let modulesSetting = vscode.workspace.getConfiguration('mis-tools').get('modules')
    if (!(modulesSetting === 'all')) {
        ternimalCommand += ' -- modules=' + modulesSetting
    }
    let terminal = showTerminal(NPM_TREMINAL_NAME)
    terminal.sendText(ternimalCommand)
}

function showTerminal(terminalName: string) {
    let mainTerminal = window.terminals.filter((terminal) => terminal.name === terminalName)[0]
    if (mainTerminal) {
        mainTerminal.dispose()
    }
    mainTerminal = window.createTerminal(terminalName)
    mainTerminal.show()
    return mainTerminal
}

export function updateLaunchBarItem(currentSelectedModules?: string) {
    if (!currentSelectedModules) {
        let modulesSetting: string = vscode.workspace.getConfiguration('mis-tools').get('modules')
        currentSelectedModules = quickPickItems
            .filter((item) => modulesSetting.includes(item.description))
            .map((item) => item.label)
            .join(',')
    }
    let currentProxyName = getCurrentProxy().currentProxyName
    let currentProxyIP = getCurrentProxy().currentProxyIP
    launchBarItem.text = `$(rocket) 启动跳房子(${currentSelectedModules}：${currentProxyName})`
    launchBarItem.tooltip = currentProxyIP
}
