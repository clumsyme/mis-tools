import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'


const window = vscode.window

const ROOTPATH = vscode.workspace.rootPath
const CONFIG_FILE = path.join(ROOTPATH, 'mis-web-react/config/.proxyrc.js')

const PROXY = {
    'dohko.mis.tiaofangzi.com': 'Dohko',
    '172.16.32.31:8083': 'release',
    '172.16.32.228:8083': '裴鹏程',
    '172.16.32.199:8083': '黄林强',
    '172.16.32.71:8083': '刘博71',
    '172.16.32.53:8083': '刘博53',
    '172.16.33.18:8083': '刘锋',
    '172.16.33.33:8083': '孙聪',
    '172.16.32.55:8083': '彩霞',
    '172.16.32.44:8083': '周建44',
    '172.16.32.156:8083': '刘雄波',
    '172.16.32.70:8083': '孙晓东70',
    '172.16.32.162:8083': '孙晓东162',
    '172.16.32.148:8083': '孙晓东148',
    '172.16.32.170:8083': '徐华曾',
    '172.16.32.65:8083': '邱晓东',
    '172.16.32.50:8083': '学堂2',
    '172.16.32.202:8083': '学堂',
}

type CurrentProxy = {
    currentProxyIP: string
    currentProxyName: string
}

const REG = new RegExp(/[^\/]proxy:['"](.*?)['"]/)
function getCurrentProxy(): null | CurrentProxy {
    let fileContent = fs
        .readFileSync(CONFIG_FILE)
        .toString()
        .replace(/[ ]/gm, '')
    let result: null | RegExpExecArray
    if ((result = REG.exec(fileContent))) {
        let currentProxyIP = result[1]
        let currentProxyName = PROXY[currentProxyIP] || currentProxyIP
        return {
            currentProxyIP,
            currentProxyName,
        }
    }
    return {
        currentProxyIP: '',
        currentProxyName: '',
    }
}
function setCurrentProxy(proxyIP: string) {
    let fileContent = fs
        .readFileSync(CONFIG_FILE)
        .toString()
        .replace(/[ ]/gm, '')
    let result: null | RegExpExecArray
    let newFileContent: string
    if ((result = REG.exec(fileContent))) {
        let matched = result[0]
        let currentProxyIP = result[1]
        let replacedMatched = matched.replace(currentProxyIP, proxyIP)
        newFileContent = fileContent.replace(matched, replacedMatched)
    } else {
        newFileContent = fileContent.replace('{', `{\nproxy:'${proxyIP}',`)
    }
    fs.writeFileSync(CONFIG_FILE, newFileContent)
    return newFileContent
}

export function onCustomProxy() {
    let inputBox = window.createInputBox()
    inputBox.placeholder = '格式：172.16.32.31:8083'
    inputBox.onDidAccept(function() {
        let value = inputBox.value.replace(' ', '')
        if (/[\d]+\.[\d]+\.[\d]+\.[\d]+:[\d]+/.test(value)) {
            setCurrentProxy(inputBox.value)
            inputBox.dispose()
        } else {
            window.showWarningMessage('请输入正确的虚拟机地址格式')
        }
    })
    inputBox.prompt = '输入要连接的后端虚拟机 IP 及端口号'
    inputBox.show()
}

export function onSelectProxy() {
    let currentProxyIP = getCurrentProxy().currentProxyIP
    let quickPick = window.createQuickPick()

    let selectedItem: vscode.QuickPickItem
    let items = [
        {
            label: '$(gear) 自定义',
            detail: 'custom',
        },
    ].concat(
        Object.entries(PROXY).map(([proxyIP, proxyName]) => {
            let item = {
                label: `$(person-filled) ${proxyName}`,
                detail: proxyIP,
            }

            if (proxyIP === currentProxyIP) {
                selectedItem = item
            }
            return item
        }),
    )
    quickPick.items = items
    quickPick.selectedItems = [selectedItem]
    quickPick.activeItems = [selectedItem]
    quickPick.onDidAccept(function() {
        let selectedItem = quickPick.activeItems[0]
        if (selectedItem.detail === 'custom') {
            onCustomProxy()
        } else {
            setCurrentProxy(selectedItem.detail)
        }
        quickPick.dispose()
    })

    quickPick.show()
}
