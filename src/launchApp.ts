import * as vscode from 'vscode'
import { quickPickItems } from './startModules'
import { getCurrentProxy } from './proxyConfig'
import { showTerminal } from './utils'

const window = vscode.window

const NPM_TREMINAL_NAME = '跳房子'

let launchBarItem: vscode.StatusBarItem
export function addLaunchButton(context: vscode.ExtensionContext) {
    launchBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000)
    updateLaunchBarItem()
    launchBarItem.command = 'misTools.launchApp'
    launchBarItem.show()

    vscode.workspace.onDidChangeConfiguration(function(event) {
        if (event.affectsConfiguration('mis-tools.modules')) {
            updateLaunchBarItem()
        }
    })

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
    launchBarItem.text = `$(rocket) 启动(${currentSelectedModules} : ${currentProxyName})`
    launchBarItem.tooltip = currentProxyIP
}
