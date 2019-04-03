"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const window = vscode.window;
const NPM_TREMINAL_NAME = '跳房子';
function activate(context) {
    addMisButton(context);
    context.subscriptions.push(vscode.commands.registerCommand('misTools.selectStartModules', onSelectStartModules));
}
exports.activate = activate;
function addMisButton(context) {
    let startBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    startBarItem.text = '启动跳房子';
    startBarItem.command = 'misTools.selectStartModules';
    startBarItem.show();
    context.subscriptions.push(startBarItem);
}
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
        },
        {
            label: '公共',
            detail: '启动公共相关模块',
        },
        {
            label: '实施',
            detail: '启动实施相关模块',
        },
        {
            label: '报表',
            detail: '启动报表相关模块',
        },
        {
            label: '基础',
            detail: '启动基础相关模块（人事、群组、权限等）',
        },
        {
            label: '学堂',
            detail: '启动学堂相关模块',
        },
    ];
    quickPick.onDidAccept(function () {
        let selectedItem = quickPick.activeItems[0];
        if (selectedItem) {
            quickPick.hide();
            let terminal = showTerminal(NPM_TREMINAL_NAME);
            terminal.sendText(`npm start -- modules=${selectedItem.detail}`);
        }
    });
    quickPick.show();
}
function showTerminal(terminalName) {
    let terminal = window.terminals.filter((ternimal) => terminal.name === terminalName);
    if (!terminal) {
        terminal = window.createTerminal(terminalName);
    }
    terminal.show();
    return terminal;
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=mis-tools.js.map