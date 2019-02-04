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
var ComponentStateContext_1 = require("./ComponentStateContext");
var ComponentStateProvider = /** @class */ (function (_super) {
    __extends(ComponentStateProvider, _super);
    function ComponentStateProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.mount = false;
        _this.state = ComponentStateContext_1.initialState;
        _this.setLoading = function (isLoading) {
            if (!_this.mount)
                return;
            var loadingValue = isLoading ? 1 : -1;
            _this.setState(function (_a) {
                var loadingCount = _a.loadingCount;
                return ({
                    isLoading: loadingCount + loadingValue > 0,
                    loadingCount: loadingCount + loadingValue,
                });
            });
        };
        _this.setError = function (error) {
            if (!_this.mount)
                return;
            _this.setResult(null);
            _this.setState({
                result: null,
                isError: !!error,
                error: error,
            });
        };
        _this.setResult = function (result) {
            if (!_this.mount)
                return;
            _this.setError(null);
            _this.setState({
                result: result,
            });
        };
        _this.mount = true;
        return _this;
    }
    ComponentStateProvider.prototype.componentWillUnmount = function () {
        this.mount = false;
    };
    ComponentStateProvider.prototype.render = function () {
        return React.createElement(ComponentStateContext_1.Provider, { value: this.getContext() }, this.props.children);
    };
    ComponentStateProvider.prototype.getContext = function () {
        return __assign({}, this.state, { setLoading: this.setLoading, setError: this.setError, setResult: this.setResult });
    };
    return ComponentStateProvider;
}(React.Component));
exports.default = ComponentStateProvider;
//# sourceMappingURL=ComponentStateProvider.js.map