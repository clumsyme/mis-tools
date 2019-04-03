"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const format_1 = require("./format");
const window = vscode.window;
function addToolButton(context) {
    let toolBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 101);
    toolBarItem.text = '跳房子工具';
    toolBarItem.command = 'misTools.selectTools';
    toolBarItem.show();
    context.subscriptions.push(toolBarItem);
    context.subscriptions.push(vscode.commands.registerCommand('misTools.selectTools', onSelectTools));
}
exports.addToolButton = addToolButton;
function onSelectTools() {
    let quickPick = window.createQuickPick();
    quickPick.items = [
        {
            label: '格式化当前文件',
            detail: '格式化',
        },
    ];
    quickPick.onDidAccept(function () {
        let selectedItem = quickPick.activeItems[0];
        if (selectedItem) {
            format_1.onFormat();
        }
    });
    quickPick.show();
}
//# sourceMappingURL=tools.js.map