"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const child_process_1 = require("child_process");
const window = vscode.window;
function onFormat() {
    let currentFilePath;
    try {
        currentFilePath = vscode.window.activeTextEditor.document.fileName;
    }
    catch (error) {
        vscode.window.showInformationMessage('当前没有打开的 JavaScript 文件');
        return;
    }
    window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: '格式化',
    }, (progress, token) => {
        return new Promise((resolve) => {
            child_process_1.exec(`npx prettier --single-quote --no-semi --trailing-comma all --arrow-parens always --tab-width 4 --print-width 100 --write ${currentFilePath}`, () => {
                resolve();
            });
        });
    });
}
exports.onFormat = onFormat;
//# sourceMappingURL=format.js.map