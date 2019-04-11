import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

class HandlerComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  render() {
    const { payload, component: Component } = this.props;
    if (Component) {
      return <Component {...payload} />;
    }
    return null;
  }
}

HandlerComponent.propTypes = {
  payload: PropTypes.shape(),
  component: PropTypes.func,
};

HandlerComponent.defaultProps = {
  payload: {},
};

export default HandlerComponent;
