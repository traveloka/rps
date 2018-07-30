import React, { Component } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import LoadingIndicator from '../Basic/LoadingIndicator';

export default class PageLoading extends Component {
  render() {
    const { title, message } = this.props;
    return (
      <View style={[StyleSheet.absoluteFill, styles.container]}>
        <LoadingIndicator dotColor={'#1ba0e2'} />
        <Text>{title}</Text>
        <Text>{message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
  },
});
