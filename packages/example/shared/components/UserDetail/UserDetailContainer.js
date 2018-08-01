import React, { Component } from 'react';

import { pageState, withPageStateProvider, decorate } from '@traveloka/rps';
import compose from 'lodash/fp/compose';
import { fetchUser } from './UserDetailAction';

import UserDetailView from './UserDetailView';
import pageStateConfig from '../../config/pageState';

export class UserDetailContainer extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const { id } = this.props.navigation.state.params;
    return fetchUser(id).then(user => this.setState({ user }));
  }

  render() {
    return <UserDetailView {...this.state.user} />;
  }
}

decorate(UserDetailContainer, {
  componentDidMount: pageState({ loading: 'page.loading', error: [ 'page.error', {
    path: 'snackbar.error',
    payload: {
      textMessage: 'Failed fetch user detail.',
    }
  }] }),
});

export default compose(withPageStateProvider(pageStateConfig), pageState())(UserDetailContainer);
