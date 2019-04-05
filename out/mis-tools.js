"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const launchApp_1 = require("./launchApp");
const tools_1 = require("./tools");
function activate(context) {
    launchApp_1.addLaunchButton(context);
    tools_1.addToolButton(context);
}
exports.activate = activate;
vscode.workspace.onDidChangeConfiguration(function () {
    let n = 1;
    let modulesSetting = vscode.workspace.getConfiguration('mis-tools').get('modules');
    vscode.workspace.getConfiguration('mis-tools').update('modules', '' + n++);
    launchApp_1.updateLaunchBarItem();
});
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=mis-tools.js.map