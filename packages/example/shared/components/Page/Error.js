import React, { Component } from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

export default class PageError extends Component {
  render() {
    return (
      <View style={[StyleSheet.absoluteFill, styles.container]}>
        <Text>{JSON.stringify(this.props)}</Text>
        <Button onPress={() => this.props.retry()} title="Retry" />
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
