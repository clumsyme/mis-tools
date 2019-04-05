"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const format_1 = require("./format");
const proxyConfig_1 = require("./proxyConfig");
const startModules_1 = require("./startModules");
const window = vscode.window;
let toolBarItem;
function addToolButton(context) {
    toolBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 101);
    toolBarItem.text = '$(tools) 跳房子工具';
    toolBarItem.command = 'misTools.selectTools';
    toolBarItem.show();
    context.subscriptions.push(toolBarItem);
    context.subscriptions.push(vscode.commands.registerCommand('misTools.selectTools', onSelectTools));
    context.subscriptions.push(vscode.commands.registerCommand('misTools.selectProxy', proxyConfig_1.onSelectProxy));
    context.subscriptions.push(vscode.commands.registerCommand('misTools.customProxy', proxyConfig_1.onCustomProxy));
    context.subscriptions.push(vscode.commands.registerCommand('misTools.selectStartModules', startModules_1.onSelectStartModules));
}
exports.addToolButton = addToolButton;
// export function updateToolBarText() {
//     let currentProxyName = getCurrentProxy().currentProxyName
//     let currentProxyIP = getCurrentProxy().currentProxyIP
//     toolBarItem.text = `$(tools) 跳房子工具(虚拟机：${currentProxyName})`
//     toolBarItem.tooltip = currentProxyIP
// }
function onSelectTools() {
    let quickPick = window.createQuickPick();
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
    ];
    quickPick.onDidAccept(function () {
        let selectedItem = quickPick.activeItems[0];
        if (selectedItem) {
            if (selectedItem.detail === 'format') {
                format_1.onFormat();
                quickPick.dispose();
            }
            else if (selectedItem.detail === 'proxy') {
                proxyConfig_1.onSelectProxy();
                quickPick.dispose();
            }
            else if (selectedItem.detail === 'modules') {
                startModules_1.onSelectStartModules();
                quickPick.dispose();
            }
        }
    });
    quickPick.show();
}
//# sourceMappingURL=tools.js.map