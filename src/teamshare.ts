import * as vscode from 'vscode'
import * as http from 'http'
import * as Parser from 'rss-parser'
import { BABY_BLUE } from './babyblue'

let parser = new Parser({
    customFields: {
        item: ['labels'],
    },
})

const { window, env, Uri } = vscode

// 最多弹窗提醒的新消息数量
const MAX_NOTIFY_NUM = 3
// 需要提醒的消息的 label
const NOTIF_LABEL = '推送'

// export let itemList: Parser.Item[] = []

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

let rssButton: vscode.StatusBarItem
let rssContext: vscode.ExtensionContext
export function addRssButton(context: vscode.ExtensionContext) {
    rssContext = context
    rssButton = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 103)
    rssButton.command = 'misTools.viewRss'
    rssButton.text = '$(rss) 最新'
    rssButton.show()

    fetchAndUpdateUnread()
    setInterval(fetchAndUpdateUnread, 600000)

    context.subscriptions.push(rssButton)
    context.subscriptions.push(vscode.commands.registerCommand('misTools.viewRss', onViewRss))
}

function fetchAndUpdateUnread() {
    fetchItems().then((feedItems) => {
        let lastReadFeedDate = rssContext.globalState.get(
            'lastReadFeedDate',
            '2000-01-01T00:00:00.925Z',
        )
        let unreadItems = feedItems.filter(
            (item) => new Date(item.pubDate) > new Date(lastReadFeedDate),
        )
        let unread = unreadItems.length

        notify(unreadItems)
        updateRssUnread(unread)
    })
}

function notify(unreadItems: Parser.Item[]) {
    let needNotifyItems = unreadItems.filter(isNeedNotifyItem).slice(0, MAX_NOTIFY_NUM)

    rssContext.globalState.update('lastNotifyDate', new Date().toString())

    needNotifyItems.forEach((item) => {
        const { author, title, link } = item
        vscode.window
            .showInformationMessage(`${author} 分享了 ${title}`, '查看')
            .then((selected) => {
                if (selected === '查看') {
                    let target = Uri.parse(link)
                    env.openExternal(target)
                }
            })
    })
}

function isNeedNotifyItem(item: Parser.Item) {
    let lastNotifyDate = new Date(
        rssContext.globalState.get('lastNotifyDate', '2000-01-01T00:00:00.925Z'),
    )
    const { pubDate, labels } = item
    try {
        return (
            labels.label.some((label: string) => label === NOTIF_LABEL) &&
            new Date(pubDate) > lastNotifyDate
        )
    } catch (error) {
        return false
    }
}

function updateRssUnread(unread: number): void {
    if (unread) {
        rssButton.text = `$(rss) 最新(${unread})`
    } else {
        rssButton.text = `$(rss) 最新`
    }
}

function fetchItems(): Promise<Parser.Item[]> {
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
                    resolve(feed.items || [])
                })
            },
        )
    })
}

async function onViewRss() {
    updateRssUnread(0)
    await rssContext.globalState.update('lastReadFeedDate', new Date().toString())

    let quickPick = window.createQuickPick()
    quickPick.onDidAccept(function() {
        let selectedItem = quickPick.activeItems[0]
        if (selectedItem) {
            let target = Uri.parse(selectedItem.detail)
            env.openExternal(target)
        }
    })
    quickPick.show()
    let feedItems = await fetchItems()
    quickPick.items = feedItems.map((item) => {
        let pubDate = new Date(item.pubDate)
        return {
            label: item.title,
            description: `${item.author}: ${pubDate.toLocaleString()}`,
            detail: item.link,
        }
    })
}
