<div style="text-align: center">
    <img src="https://raw.githubusercontent.com/clumsyme/mis-tools/master/images/logo.png" />
    <h1>跳房子开发相关工具</h1>
</div>

## 安装

请到 [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Yan.mis-tools) 下载安装。

## 功能

- 点击直接启动项目
  - 配置默认启动模块
- 选择连接虚拟机
- 格式化代码文件（[查看相关规则](#prettier自定义规则)）

## 参考

### prettier自定义规则

代码使用 [prettier](https://prettier.io/docs/en/options.html) 进行格式化，除其默认规则外，自定义了以下规则：

```js
{
    // 4个空格缩进      
    tabWidth: 4,
    // 单行最大字符数
    printWidth: 100,
    // 句末没有分号
    semi: false,
    // 使用单引号
    singleQuote: true,
    // 多行模式添加逗号
    trailingComma: 'all',
    // 箭头函数参数添加括号
    arrowParens: 'always',
}
```

## 贡献代码

如果发现有什么问题，或者有功能需要添加，可以到 [GitHub](https://github.com/clumsyme/mis-tools) 提 [issue](https://github.com/clumsyme/mis-tools/issues/new) 或 [Pull Request](https://github.com/clumsyme/mis-tools/compare)。