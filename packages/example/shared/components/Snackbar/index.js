import React, { Component } from 'react';
import { View } from 'react-native';
import Snackbar from './SnackbarComponent';

export default class AutocloseSnackbar extends Component {

  state = {
    visible: false,
  }

  constructor(props) {
    super(props);
    this.mount = false;
  }

  componentDidMount() {
    this.mount = true;
    this.setState({
      visible: true,
    });
    setTimeout(() => {
      if (this.mount) {
        this.setState({
          visible: false,
        });
      }
    }, 3000);
  }

  componentWillUnmount() {
    this.mount = false;
  }

  render() {
    return (
      <Snackbar {...this.props} visible={this.state.visible} />
    )
  }
}