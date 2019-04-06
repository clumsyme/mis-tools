"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const launchApp_1 = require("./launchApp");
const tools_1 = require("./tools");
function activate(context) {
    launchApp_1.addLaunchButton(context);
    tools_1.addToolButton(context);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=index.js.map