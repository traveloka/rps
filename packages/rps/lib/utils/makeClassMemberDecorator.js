"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * inspired by : https://github.com/NYTimes/react-tracking
 *
 *
 * Helper to decorate class member
 * Supports class plain methods, field syntax and lazy methods
 * @param {Function} decorate Actual decorator function.
 * Example:
 *   decoratedFn => function () {
 *     // do stuff...
 *     return Object.apply(decoratedFn, this, arguments);
 *   }
 * @returns {Function} Class member decorator ((target, name, descriptor) => newDescriptor)
 */
function makeClassMemberDecorator(decorate) {
    return function decorateClassMember(target, name, descriptor) {
        var configurable = descriptor.configurable, enumerable = descriptor.enumerable, value = descriptor.value, get = descriptor.get, initializer = descriptor.initializer;
        if (value) {
            return {
                configurable: configurable,
                enumerable: enumerable,
                value: decorate(value),
                writable: true,
            };
        }
        // support lazy initializer
        if (get || initializer) {
            return {
                configurable: configurable,
                enumerable: enumerable,
                get: function () {
                    // This happens if someone accesses the
                    // property directly on the prototype
                    if (this === target) {
                        return null;
                    }
                    var resolvedValue = initializer ? initializer.apply(this, []) : get.apply(this, []);
                    var decoratedValue = decorate(resolvedValue).bind(this);
                    Object.defineProperty(this, name, {
                        configurable: configurable,
                        enumerable: enumerable,
                        value: decoratedValue,
                        writable: true,
                    });
                    return decoratedValue;
                },
            };
        }
        throw new Error('called makeClassMemberDecorator on unsupported descriptor');
    };
}
exports.default = makeClassMemberDecorator;
//# sourceMappingURL=makeClassMemberDecorator.js.map