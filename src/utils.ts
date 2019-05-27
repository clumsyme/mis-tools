import * as vscode from 'vscode'

const workspaceFolders = vscode.workspace.workspaceFolders

export const ROOTPATH = workspaceFolders ? workspaceFolders[0].uri.fsPath : ''
