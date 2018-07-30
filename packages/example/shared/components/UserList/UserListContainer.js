import React, { Component } from 'react';
import UserListView from './UserListView';

import { pageState } from '@traveloka/rps';
import { fetchUsers } from './UserListAction';

@pageState()
export default class UserListContainer extends Component {
  state = {
    users: [],
  };

  @pageState({
    loading: 'modal.loading',
    error: 'snackbar.error',
    success: {
      path: 'snackbar.success',
      payload: {
        textMessage: 'Success fetch users',
      },
    },
  })
  componentDidMount() { // must return promise
    return fetchUsers().then(data => this.setState({ users: data }));
  }

  handleGoToUserDetail = user => {
    this.props.navigation.navigate('UserDetail', {
      id: user.id,
    });
  };

  render() {
    return <UserListView users={this.state.users} onClickUser={this.handleGoToUserDetail} />;
  }
}
