"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const launchApp_1 = require("./launchApp");
const window = vscode.window;
exports.quickPickItems = [
    {
        label: '完整启动',
        detail: '启动所有模块',
        description: 'all',
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
function addMisButton(context) {
    let startBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    startBarItem.text = '$(rocket) 启动跳房子';
    startBarItem.command = 'misTools.selectStartModules';
    startBarItem.show();
    context.subscriptions.push(startBarItem);
    context.subscriptions.push(vscode.commands.registerCommand('misTools.selectStartModules', onSelectStartModules));
}
exports.addMisButton = addMisButton;
function onSelectStartModules() {
    let misSetting = vscode.workspace.getConfiguration('mis-tools');
    let modulesSetting = misSetting.get('modules');
    let quickPick = window.createQuickPick();
    quickPick.canSelectMany = true;
    quickPick.items = exports.quickPickItems;
    let currentSelectedItems = quickPick.items.filter((item) => modulesSetting.includes(item.description));
    quickPick.selectedItems = currentSelectedItems;
    quickPick.onDidChangeSelection(function (items) {
        if (
        // 选中所有
        !currentSelectedItems.some((item) => item.description === 'all') &&
            items.some((item) => item.description === 'all')) {
            quickPick.selectedItems = exports.quickPickItems.slice(0, 1);
        }
        else if (currentSelectedItems.some((item) => item.description === 'all') &&
            items.some((item) => item.description === 'all') &&
            items.length > 1) {
            quickPick.selectedItems = items.filter((item) => item.description !== 'all');
        }
        currentSelectedItems = items;
    });
    quickPick.onDidAccept(function () {
        let misSetting = vscode.workspace.getConfiguration('mis-tools');
        const selectedItems = quickPick.selectedItems;
        const selectedModules = selectedItems
            .map((selectedItem) => selectedItem.description)
            .join(',');
        misSetting.update('modules', selectedModules, true);
        launchApp_1.updateLaunchBarItem(selectedItems.map((item) => item.label).join(','));
        quickPick.dispose();
    });
    quickPick.show();
}
exports.onSelectStartModules = onSelectStartModules;
//# sourceMappingURL=startModules.js.map