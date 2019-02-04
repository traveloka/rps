"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function decorate(thing, decorators) {
    var target = typeof thing === 'function' ? thing.prototype : thing;
    for (var prop in decorators) {
        var decorator = decorators[prop];
        var descriptor = Object.getOwnPropertyDescriptor(target, prop);
        var newDescriptor = decorator(target, prop, descriptor);
        if (newDescriptor)
            Object.defineProperty(target, prop, newDescriptor);
    }
    return thing;
}
exports.default = decorate;
//# sourceMappingURL=decorate.js.map