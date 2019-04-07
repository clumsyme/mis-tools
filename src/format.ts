import * as vscode from 'vscode'
import { exec } from 'child_process'
import * as prettier from 'prettier'

const window = vscode.window

function fullDocumentRange(document: vscode.TextDocument): vscode.Range {
    const lastLineId = document.lineCount - 1
    return new vscode.Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length)
}

export function onFormat() {
    let currentFilePath: string
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
                let opendDocument: vscode.TextDocument = vscode.window.activeTextEditor.document
                let formatted = prettier.format(opendDocument.getText(), {
                    parser: 'babel',
                    semi: false,
                    singleQuote: true,
                    trailingComma: 'all',
                    arrowParens: 'always',
                    tabWidth: 4,
                    printWidth: 100,
                })
                const edit = new vscode.WorkspaceEdit()
                edit.replace(opendDocument.uri, fullDocumentRange(opendDocument), formatted)
                vscode.workspace.applyEdit(edit)
                resolve()
            })
        },
    )
}
