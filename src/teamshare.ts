import * as vscode from 'vscode'
import * as http from 'http'
import * as Parser from 'rss-parser'
import { BABY_BLUE } from './babyblue'

let parser = new Parser()

const { window, env, Uri } = vscode

export let itemList: Parser.Item[] = []

export function addShareButton(context: vscode.ExtensionContext) {
    let shareButton = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 102)
    shareButton.command = 'misTools.gotoIssues'
    shareButton.text = '$(pencil) 分享'
    shareButton.show()

    context.subscriptions.push(shareButton)
    context.subscriptions.push(vscode.commands.registerCommand('misTools.gotoIssues', onGotoIssues))
}

function onGotoIssues() {
    let target = Uri.parse('http://git.hualala.com/liyan/teamshare/issues/new')
    env.openExternal(target)
}

export function addRssButton(context: vscode.ExtensionContext) {
    // itemList = context.workspaceState.get('rssItemList', [])
    let rssButton = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 103)
    rssButton.command = 'misTools.viewRss'
    rssButton.text = '$(rss) 最新'
    rssButton.show()

    context.subscriptions.push(rssButton)
    context.subscriptions.push(
        vscode.commands.registerCommand('misTools.viewRss', onViewRss),
    )
}

function updateItemList() {
    return new Promise((resolve) => {
        http.get(
            'http://git.hualala.com/liyan/teamshare/issues.atom',
            {
                method: 'GET',
                headers: {
                    'Private-Token': BABY_BLUE,
                },
            },
            (response) => {
                let data = ''
                response.on('data', (chunk) => {
                    data += chunk
                })
                response.on('end', async () => {
                    let feed = await parser.parseString(data)
                    itemList = feed.items
                    resolve()
                })
            },
        )
    })
}

function onViewRss() {
    let quickPick = window.createQuickPick()
    updateItemList().then(() => {
        quickPick.items = itemList.map((item) => {
            let pubDate = new Date(item.pubDate)
            return {
                label: item.title,
                description: `${item.author}: ${pubDate.toLocaleString()}`,
                detail: item.link,
            }
        })
    })

    quickPick.onDidAccept(function() {
        let selectedItem = quickPick.activeItems[0]
        if (selectedItem) {
            let target = Uri.parse(selectedItem.detail)
            env.openExternal(target)
        }
    })

    quickPick.show()
}
