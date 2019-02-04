"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pageStateMethod_1 = require("./pageStateMethod");
var pageStateClass_1 = require("./pageStateClass");
function pageState() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function decorator(a, b, c) {
        if (!b) {
            // decorating a class
            return pageStateClass_1.default()(a);
        }
        // decorating a method
        return pageStateMethod_1.default.apply(void 0, args)(a, b, c);
    };
}
exports.default = pageState;
//# sourceMappingURL=pageState.js.map