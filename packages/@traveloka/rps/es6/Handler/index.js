import React from 'react';
import PropTypes from 'prop-types';

function HandlerComponent({ name, type, payload, config }) {
  if (type in config) {
    const Component = config[type];
    return <Component {...payload} />;
  }
  return null;
}

HandlerComponent.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  payload: PropTypes.shape(),
  config: PropTypes.shape(),
};

HandlerComponent.defaultProps = {
  config: {},
};

export default HandlerComponent;
