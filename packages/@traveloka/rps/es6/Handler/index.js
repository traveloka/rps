import React from 'react';
import PropTypes from 'prop-types';

function HandlerComponent({ payload, component: Component }) {
  if (Component) {
    return <Component {...payload} />;
  }
  return null;
}

HandlerComponent.propTypes = {
  payload: PropTypes.shape(),
  component: PropTypes.func,
};

HandlerComponent.defaultProps = {
  payload: {},
};

export default HandlerComponent;
