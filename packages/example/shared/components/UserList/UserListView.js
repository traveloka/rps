import React, { Component } from 'react';

import { View, Text, TouchableWithoutFeedback, FlatList } from 'react-native';

import PropTypes from 'prop-types';

export default class UserListView extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
  };

  renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onClickUser(item)}>
        <View style={{ padding: 6 }}>
          <Text>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList data={this.props.users} renderItem={this.renderItem} keyExtractor={item => item.id} />
      </View>
    );
  }
}
