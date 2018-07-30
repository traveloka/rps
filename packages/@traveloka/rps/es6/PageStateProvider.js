import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import get from 'lodash/get';

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
    const { config } = this.props;
    Object.keys(config).forEach(path => this.setPageState(path));
  };

  getContext() {
    return {
      setPageState: this.setPageState,
      resetPageState: this.resetPageState,
      reset: this.reset,
    };
  }

  render() {
    const { config } = this.props;
    return (
      <Provider value={this.getContext()}>
        <View style={{ flex: 1 }}>
          {this.state.isRenderChildren && this.props.children}
          {Object.keys(config).map(configName => (
            <Handler key={`handler-${configName}`} config={config[configName]} {...get(this.state, configName)} />
          ))}
        </View>
      </Provider>
    );
  }
}
