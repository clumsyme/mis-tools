"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const format_1 = require("./format");
const proxyConfig_1 = require("./proxyConfig");
const window = vscode.window;
let toolBarItem;
function addToolButton(context) {
    toolBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 101);
    updateToolBarText();
    toolBarItem.command = 'misTools.selectTools';
    toolBarItem.show();
    context.subscriptions.push(toolBarItem);
    context.subscriptions.push(vscode.commands.registerCommand('misTools.selectTools', onSelectTools));
    context.subscriptions.push(vscode.commands.registerCommand('misTools.selectProxy', proxyConfig_1.onSelectProxy));
    context.subscriptions.push(vscode.commands.registerCommand('misTools.customProxy', proxyConfig_1.onCustomProxy));
}
exports.addToolButton = addToolButton;
function updateToolBarText() {
    let currentProxyName = proxyConfig_1.getCurrentProxy().currentProxyName;
    let currentProxyIP = proxyConfig_1.getCurrentProxy().currentProxyIP;
    toolBarItem.text = `$(tools) 跳房子工具(虚拟机：${currentProxyName})`;
    toolBarItem.tooltip = currentProxyIP;
}
exports.updateToolBarText = updateToolBarText;
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
        }
    });
    quickPick.show();
}
//# sourceMappingURL=tools.js.map