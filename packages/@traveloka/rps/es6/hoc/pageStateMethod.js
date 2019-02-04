/* eslint-disable babel/no-invalid-this, prefer-rest-params */

import makeClassMemberDecorator from './makeClassMemberDecorator';
import merge from 'lodash/merge';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';

export function mergePayload(path, _payload = {}, _mergedPayload, props) {
  const payload = (typeof _payload === 'function') ? _payload(props) : _payload;
  const mergedPayload = (typeof _mergedPayload === 'function') ? _mergedPayload(props) : _mergedPayload;
  return [
    path,
    merge({}, payload, {
      payload: mergedPayload,
    })
  ]
}

export function translatePayload(config, props) {
  if (typeof config === 'string') {
    return [
      config,
      {}
    ];
  }
  const [path, payload] = translatePayload(config.path);
  return mergePayload(path, payload, config.payload, props);
}

export default function pageStateMethod(config = {}, { callback } = {}) {
  return makeClassMemberDecorator(
    decoratedFn =>
      function decorateClassMember() {
        return new Promise((resolve, reject) => {
          if (!has(this.props, 'setPageState')) {
            reject('Component didn\'t have decorator pageState.');
          }
          let args = null;

          const loadingConfigs = (Array.isArray(config.loading) ? config.loading : [config.loading]).filter(Boolean);
          const errorConfigs = (Array.isArray(config.error) ? config.error : [config.error]).filter(Boolean);
          const successConfigs = (Array.isArray(config.success) ? config.success : [config.success]).filter(Boolean);

          this.props.resetPageState(); // reset all

          const promiseFn = new Promise((resolve, reject) => {
            const fn = () => {
              const fnResult = decoratedFn.apply(this, arguments);
              if (fnResult && fnResult.then) fnResult.then(resolve).catch(reject);
              else {
                resolve(fnResult);
              }
            };
            if (callback) return callback().then(fn);
            return fn();
          });

          if (!isEmpty(loadingConfigs)) {
            loadingConfigs.forEach(loadingConfig => {
              // run loading
              args = translatePayload(loadingConfig, this.props);
              this.props.setPageState(...args);
            });
          }

          // do the function
          return promiseFn.then((result) => {
            this.props.resetPageState(); // reset all
            // success
            if (!isEmpty(successConfigs)) {
              successConfigs.forEach(successConfig => {
                // run success callback
                args = translatePayload(successConfig, this.props);
                this.props.setPageState(...mergePayload(...args, {
                  result,
                }));
              });
            }
            resolve(result);
          }).catch(e => {
            // error
            this.props.resetPageState(); // reset all
            const retryFn = decorateClassMember.bind(this);
            if (!isEmpty(errorConfigs)) {
              // handled error
              errorConfigs.forEach(errorConfig => {
                args = translatePayload(errorConfig, this.props); // run error

                this.props.setPageState(
                  ...mergePayload(...args, {
                    error: e,
                    retry: () => retryFn.apply(this, arguments),
                  })
                );
              });
              resolve();
            } else {
              reject(e);
            }
          });
        });
      }
  );
}
