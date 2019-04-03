import * as vscode from 'vscode'
import { execSync } from 'child_process'

// vscode.window.activeTextEditor.document.fileName

export function onFormat() {
    let currentFilePath
    try {
        currentFilePath = vscode.window.activeTextEditor.document.fileName
    } catch (error) {
        vscode.window.showInformationMessage('当前没有打开的 JavaScript 文件')
        return
    }
    execSync(`npx prettier --single-quote --no-semi --trailing-comma es5 --arrow-parens always --tab-width 4 --print-width 100 --write ${currentFilePath}`)
}