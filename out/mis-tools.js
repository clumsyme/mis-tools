"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startModules_1 = require("./startModules");
const tools_1 = require("./tools");
function activate(context) {
    startModules_1.addMisButton(context);
    tools_1.addToolButton(context);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=mis-tools.js.map