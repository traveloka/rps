import React, { Component } from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';
import flatten from 'flat';

import Handler from './Handler';

import { Provider } from './PageStateContext';

export default class PageStateProvider extends Component {
  static propTypes = {
    config: PropTypes.shape().isRequired,
    callback: PropTypes.func,
  };

  state = {
    isRenderChildren: !this.props.callback,
  };

  static defaultProps = {
    config: {},
  };

  constructor(props) {
    super(props);
    this.mount = true;
  }

  componentDidMount() {
    this.props.callback && this.props.callback(this.getContext()).then(() => {
      this.setState({
        isRenderChildren: true,
      });
    })
  }

  componentWillUnmount() {
    this.mount = false;
  }

  setPageState = (path, value) => {
    if (!this.mount) return;
    this.setState({
      [path]: value,
    });
  };

  resetPageState = (...args) => {
    if (args && args.length) {
      this.setPageState(args[0]);
    } else {
      this.reset();
    }
  };

  reset = () => {
    const config = this.getConfig();
    Object.keys(config).forEach(key => this.setPageState(key));
  };

  getConfig = () => {
    const { config } = this.props;
    const flattenConfig = flatten(config);
    return flattenConfig;
  }

  getContext() {
    return {
      setPageState: this.setPageState,
      resetPageState: this.resetPageState,
      reset: this.reset,
    };
  }

  render() {
    const config = this.getConfig();
    return (
      <Provider value={this.getContext()}>
        <React.Fragment>
          {this.state.isRenderChildren && this.props.children}
          {Object.keys(config).map(configName => {
            if (get(this.state, configName)) {
              return <Handler key={`handler-${configName}`} component={get(config, configName)} {...get(this.state, configName)} />
            }
            return null;
          })}
        </React.Fragment>
      </Provider>
    );
  }
}
