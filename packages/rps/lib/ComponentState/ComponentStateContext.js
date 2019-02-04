"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var createReactContext = require("create-react-context");
exports.initialState = {
    isLoading: false,
    loadingCount: 0,
    isError: false,
    error: null,
    result: null,
};
exports.Provider = (_a = createReactContext(exports.initialState), _a.Provider), exports.Consumer = _a.Consumer;
//# sourceMappingURL=ComponentStateContext.js.map