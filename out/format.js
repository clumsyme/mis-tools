"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const child_process_1 = require("child_process");
// vscode.window.activeTextEditor.document.fileName
function onFormat() {
    let currentFilePath;
    try {
        currentFilePath = vscode.window.activeTextEditor.document.fileName;
    }
    catch (error) {
        vscode.window.showInformationMessage('当前没有打开的 JavaScript 文件');
        return;
    }
    child_process_1.execSync(`npx prettier --single-quote --no-semi --trailing-comma es5 --arrow-parens always --tab-width 4 --print-width 100 --write ${currentFilePath}`);
}
exports.onFormat = onFormat;
//# sourceMappingURL=format.js.map