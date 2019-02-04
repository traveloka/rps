"use strict";
/* eslint-disable babel/no-invalid-this, prefer-rest-params */
Object.defineProperty(exports, "__esModule", { value: true });
var merge = require("lodash/merge");
var States;
(function (States) {
    States["LOADING"] = "loading";
    States["ERROR"] = "error";
    States["SUCCESS"] = "success";
})(States || (States = {}));
function mergePayload(path, _payload, _mergedPayload, props) {
    if (_payload === void 0) { _payload = {}; }
    var payload = typeof _payload === 'function' ? _payload(props) : _payload;
    var mergedPayload = typeof _mergedPayload === 'function' ? _mergedPayload(props) : _mergedPayload;
    return [
        path,
        merge({}, payload, {
            payload: mergedPayload,
        }),
    ];
}
exports.mergePayload = mergePayload;
function translatePayload(config, props) {
    if (typeof config === 'string') {
        return [config, {}];
    }
    var _a = translatePayload(config.path, props), path = _a[0], payload = _a[1];
    return mergePayload(path, payload, config.payload, props);
}
exports.translatePayload = translatePayload;
function pageStateMethod(config) {
    if (config === void 0) { config = {}; }
    return function (a, b, c) {
        console.log(a, b, c);
        // return makeClassMemberDecorator(function decorateClassMember(this: any, _decoratedFn: any): any {
        //   const args = arguments;
        //   const decoratedFn: any = componentStateMethod()(a, b, c);
        //   return new Promise((resolve, reject) => {
        //     if (!has(this.props, 'pageState')) {
        //       console.error("Component didn't have decorator pageState.");
        //     }
        //     let path = null,
        //       payload = null;
        //     const loadingConfig = config.loading;
        //     const errorConfig = config.error;
        //     const successConfig = config.success;
        //     this.props.reset(); // reset all
        //     const promiseFn = new Promise((res, rej) => {
        //       const fn = () => {
        //         const fnResult = decoratedFn.apply(this, args);
        //         if (fnResult && fnResult.then) fnResult.then(res).catch(rej);
        //         else {
        //           res(fnResult);
        //         }
        //       };
        //       return fn();
        //     });
        //     if (loadingConfig) {
        //       // run loading
        //       [path, payload] = translatePayload(loadingConfig, this.props);
        //       this.props.setPageState(path, payload);
        //     }
        //     return promiseFn
        //       .then(result => {
        //         this.props.reset(); // reset all
        //         if (!isEmpty(successConfig)) {
        //           [path, payload] = translatePayload(successConfig, this.props);
        //           this.props.setPageState(...mergePayload(path, payload, {}, this.props));
        //         }
        //         resolve(result);
        //       })
        //       .catch(e => {
        //         this.props.reset(); // reset all
        //         if (!isEmpty(errorConfig)) {
        //           const retryFn = decorateClassMember.bind(this);
        //           [path, payload] = translatePayload(errorConfig, this.props);
        //           this.props.setPageState(
        //             ...mergePayload(
        //               path,
        //               payload,
        //               {
        //                 error: e,
        //                 retry: () => retryFn.apply(this, args),
        //               },
        //               this.props
        //             )
        //           );
        //           resolve();
        //         } else {
        //           reject(e);
        //         }
        //       });
        //   });
        // });
    };
}
exports.default = pageStateMethod;
//# sourceMappingURL=pageStateMethod.js.map