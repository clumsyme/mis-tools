import * as vscode from 'vscode'
import * as prettier from 'prettier'

const window = vscode.window

function fullDocumentRange(document: vscode.TextDocument): vscode.Range {
    const lastLineId = document.lineCount - 1
    return new vscode.Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length)
}

function getParserOptions(currentFilePath: string): prettier.Options {
    let ext: string = currentFilePath.split('.').slice(-1)[0]
    switch (ext) {
        case 'css':
            return {
                parser: 'css',
                tabWidth: 4,
            }
        case 'html':
        case 'htm':
            return {
                parser: 'html',
                tabWidth: 4,
            }
        default:
            return {
                parser: 'babel',
                semi: false,
                singleQuote: true,
                trailingComma: 'all',
                arrowParens: 'always',
                tabWidth: 4,
                printWidth: 100,
            }
    }
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
                let openedDocument: vscode.TextDocument = vscode.window.activeTextEditor.document
                let formatted: string = prettier.format(openedDocument.getText(), getParserOptions(currentFilePath))
                const edit: vscode.WorkspaceEdit = new vscode.WorkspaceEdit()
                edit.replace(openedDocument.uri, fullDocumentRange(openedDocument), formatted)
                vscode.workspace.applyEdit(edit)
                resolve()
            })
        },
    )
}
