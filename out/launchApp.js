"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const startModules_1 = require("./startModules");
const proxyConfig_1 = require("./proxyConfig");
const window = vscode.window;
const NPM_TREMINAL_NAME = '跳房子';
let launchBarItem;
function addLaunchButton(context) {
    launchBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    updateLaunchBarItem();
    launchBarItem.command = 'misTools.launchApp';
    launchBarItem.show();
    vscode.workspace.onDidChangeConfiguration(function (event) {
        if (event.affectsConfiguration('mis-tools.modules')) {
            updateLaunchBarItem();
        }
    });
    context.subscriptions.push(launchBarItem);
    context.subscriptions.push(vscode.commands.registerCommand('misTools.launchApp', onLaunchApp));
}
exports.addLaunchButton = addLaunchButton;
function onLaunchApp() {
    let ternimalCommand = 'npm start';
    let modulesSetting = vscode.workspace.getConfiguration('mis-tools').get('modules');
    if (!(modulesSetting === 'all')) {
        ternimalCommand += ' -- modules=' + modulesSetting;
    }
    let terminal = showTerminal(NPM_TREMINAL_NAME);
    terminal.sendText(ternimalCommand);
}
function showTerminal(terminalName) {
    let mainTerminal = window.terminals.filter((terminal) => terminal.name === terminalName)[0];
    if (mainTerminal) {
        mainTerminal.dispose();
    }
    mainTerminal = window.createTerminal(terminalName);
    mainTerminal.show();
    return mainTerminal;
}
function updateLaunchBarItem(currentSelectedModules) {
    if (!currentSelectedModules) {
        let modulesSetting = vscode.workspace.getConfiguration('mis-tools').get('modules');
        currentSelectedModules = startModules_1.quickPickItems
            .filter((item) => modulesSetting.includes(item.description))
            .map((item) => item.label)
            .join(',');
    }
    let currentProxyName = proxyConfig_1.getCurrentProxy().currentProxyName;
    let currentProxyIP = proxyConfig_1.getCurrentProxy().currentProxyIP;
    launchBarItem.text = `$(rocket) 启动跳房子(${currentSelectedModules} : ${currentProxyName})`;
    launchBarItem.tooltip = currentProxyIP;
}
exports.updateLaunchBarItem = updateLaunchBarItem;
//# sourceMappingURL=launchApp.js.map