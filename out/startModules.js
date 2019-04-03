"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const window = vscode.window;
const NPM_TREMINAL_NAME = '跳房子';
function addMisButton(context) {
    let startBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    startBarItem.text = '启动跳房子';
    startBarItem.command = 'misTools.selectStartModules';
    startBarItem.show();
    context.subscriptions.push(startBarItem);
    context.subscriptions.push(vscode.commands.registerCommand('misTools.selectStartModules', onSelectStartModules));
}
exports.addMisButton = addMisButton;
function onSelectStartModules() {
    let quickPick = window.createQuickPick();
    quickPick.items = [
        {
            label: '完整启动',
            detail: '启动所有模块',
        },
        {
            label: '销售',
            detail: '启动销售相关模块',
            description: 'sales',
        },
        {
            label: '公共',
            detail: '启动公共相关模块',
            description: 'common',
        },
        {
            label: '实施',
            detail: '启动实施相关模块',
            description: 'implement',
        },
        {
            label: '报表',
            detail: '启动报表相关模块',
            description: 'report',
        },
        {
            label: '基础',
            detail: '启动基础相关模块（人事、群组、权限等）',
            description: 'basic',
        },
        {
            label: '学堂',
            detail: '启动学堂相关模块',
            description: 'school',
        },
    ];
    quickPick.onDidAccept(function () {
        let selectedItem = quickPick.activeItems[0];
        if (selectedItem) {
            let ternimalCommand = 'npm start';
            if (selectedItem.description) {
                ternimalCommand += ' -- modules=' + selectedItem.description;
            }
            quickPick.hide();
            let terminal = showTerminal(NPM_TREMINAL_NAME);
            terminal.sendText(ternimalCommand);
        }
    });
    quickPick.show();
}
function showTerminal(terminalName) {
    let mainTerminal = window.terminals.filter((terminal) => terminal.name === terminalName)[0];
    if (!mainTerminal) {
        mainTerminal = window.createTerminal(terminalName);
    }
    mainTerminal.show();
    return mainTerminal;
}
//# sourceMappingURL=startModules.js.map