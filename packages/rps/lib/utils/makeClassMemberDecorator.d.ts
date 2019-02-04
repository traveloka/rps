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
export default function makeClassMemberDecorator(decorate: any): (target: any, name: any, descriptor?: any) => any;
