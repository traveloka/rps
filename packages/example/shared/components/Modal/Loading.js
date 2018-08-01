import React, { Component } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-web-modal';
import LoadingIndicator from '../Basic/LoadingIndicator';

export default class ModalLoading extends Component {
  render() {
    return (
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
        <Modal animationType="none" transparent={true} visible={true}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '80%', minHeight: 100, padding: 10, backgroundColor: 'white', borderRadius: 5 }}>
              <LoadingIndicator />
              <Text style={{ marginTop: 6 }}>Modal Loading</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
