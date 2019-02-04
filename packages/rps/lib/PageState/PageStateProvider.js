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
var get = require("lodash/get");
var flatten = require("flat");
var PageStateContext_1 = require("./PageStateContext");
var Handler_1 = require("./Handler");
var PageStateProvider = /** @class */ (function (_super) {
    __extends(PageStateProvider, _super);
    function PageStateProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mount = false;
        _this.state = {};
        _this.setPageState = function (path, value) {
            var _a;
            if (!_this.mount)
                return;
            _this.setState((_a = {},
                _a[path] = value,
                _a));
        };
        _this.resetPageState = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args && args.length) {
                _this.setPageState(args[0]);
            }
            else {
                _this.reset();
            }
        };
        _this.getConfig = function () {
            var config = _this.props.config;
            var flattenConfig = flatten(config);
            return flattenConfig;
        };
        _this.reset = function () {
            var config = _this.getConfig();
            Object.keys(config).forEach(function (key) { return _this.setPageState(key); });
        };
        _this.getStateComponent = function (path) {
            var config = _this.props.config;
            var flattenConfig = flatten(config);
            return get(flattenConfig, path);
        };
        return _this;
    }
    PageStateProvider.prototype.componentWillUnmount = function () {
        this.mount = false;
    };
    PageStateProvider.prototype.getContext = function () {
        return {
            setPageState: this.setPageState,
            resetPageState: this.resetPageState,
            reset: this.reset,
        };
    };
    PageStateProvider.prototype.render = function () {
        var _this = this;
        var config = this.getConfig();
        return (React.createElement(PageStateContext_1.Provider, { value: this.getContext() },
            React.createElement(React.Fragment, null,
                this.props.children,
                Object.keys(config).map(function (configName) {
                    if (get(_this.state, configName)) {
                        return (React.createElement(Handler_1.default, __assign({ key: "handler-" + configName, component: get(config, configName) }, get(_this.state, configName))));
                    }
                    return null;
                }))));
    };
    PageStateProvider.defaultProps = {
        config: {},
    };
    return PageStateProvider;
}(React.Component));
exports.default = PageStateProvider;
//# sourceMappingURL=PageStateProvider.js.map