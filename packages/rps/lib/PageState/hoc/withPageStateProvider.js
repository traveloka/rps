"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var PageStateProvider_1 = require("../PageStateProvider");
var hoist_non_react_statics_1 = require("hoist-non-react-statics");
function withPageStateProvider(config, propsConfig) {
    if (config === void 0) { config = {}; }
    if (propsConfig === void 0) { propsConfig = {}; }
    return function (WrapperComponent) {
        var Comp = /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.render = function () {
                return (React.createElement(PageStateProvider_1.default, __assign({ config: config }, propsConfig),
                    React.createElement(WrapperComponent, __assign({}, this.props))));
            };
            return class_1;
        }(React.Component));
        Comp = hoist_non_react_statics_1.default(Comp, WrapperComponent);
        return Comp;
    };
}
exports.default = withPageStateProvider;
//# sourceMappingURL=withPageStateProvider.js.map