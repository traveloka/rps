"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var has = require("lodash/has");
var makeClassMemberDecorator_1 = require("../../utils/makeClassMemberDecorator");
function componentStateMethod() {
    return makeClassMemberDecorator_1.default(function decorate(decoratedFn) {
        var _this = this;
        var args = arguments;
        return new Promise(function (resolve, reject) {
            if (has(_this.props, 'componentState')) {
                reject("Component didn't have decorator componentState.");
            }
            var _a = _this.props.componentState, setLoading = _a.setLoading, setError = _a.setError, setResult = _a.setResult;
            setLoading(true);
            return Promise.resolve(decoratedFn.apply(_this, args))
                .then(function (result) {
                setLoading(false);
                setResult(result);
                resolve(result);
            })
                .catch(function (error) {
                setLoading(false);
                setError(error);
                reject(error);
            });
        });
    });
}
exports.default = componentStateMethod;
//# sourceMappingURL=componentStateMethod.js.map