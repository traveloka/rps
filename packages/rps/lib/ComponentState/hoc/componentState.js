"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var componentStateMethod_1 = require("./componentStateMethod");
var componentStateClass_1 = require("./componentStateClass");
function componentState(a, b, c) {
    if (!b) {
        // decorating a class
        return componentStateClass_1.default(a);
    }
    // decorating a method
    return componentStateMethod_1.default()(a, b, c);
}
exports.default = componentState;
//# sourceMappingURL=componentState.js.map