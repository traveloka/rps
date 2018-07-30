import React, { Component } from 'react';

import { View, Text, Image } from 'react-native';

import PropTypes from 'prop-types';

export default class UserDetailView extends Component {
  static propTypes = {
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
  };

  render() {
    const { name, avatarUrl } = this.props;
    if (!name) return null;
    return (
      <View style={{ padding: 6 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Image source={{ uri: avatarUrl }} style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 10 }} />
          <Text>{name}</Text>
        </View>
      </View>
    );
  }
}
