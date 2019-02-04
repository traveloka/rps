"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var HandlerComponent = function (_a) {
    var payload = _a.payload, Component = _a.component;
    if (Component) {
        return React.createElement(Component, __assign({}, payload));
    }
    return null;
};
HandlerComponent.defaultProps = {
    payload: {},
};
exports.default = HandlerComponent;
//# sourceMappingURL=index.js.map