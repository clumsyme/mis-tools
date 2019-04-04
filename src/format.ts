import * as vscode from 'vscode'
import { exec } from 'child_process'

const window = vscode.window

export function onFormat() {
    let currentFilePath
    try {
        currentFilePath = vscode.window.activeTextEditor.document.fileName
    } catch (error) {
        vscode.window.showInformationMessage('当前没有打开的 JavaScript 文件')
        return
    }
    window.withProgress(
        {
            location: vscode.ProgressLocation.Notification,
            title: '格式化',
        },
        (progress, token) => {
            return new Promise((resolve) => {
                exec(
                    `npx prettier --single-quote --no-semi --trailing-comma es5 --arrow-parens always --tab-width 4 --print-width 100 --write ${currentFilePath}`,
                    () => {
                        resolve()
                    },
                )
            })
        },
    )
}
