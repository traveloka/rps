import React from 'react';
import { View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { PageStateProvider } from '@traveloka/rps';

import UserListContainer from './components/UserList/UserListContainer';
import UserDetailContainer from './components/UserDetail/UserDetailContainer';

import pageStateConfig from './config/pageState';

const Home = props => {
  return <Button title="Go to user list" onPress={() => props.navigation.navigate('UserList')} />;
};

const Route = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    UserList: {
      screen: UserListContainer,
    },
    UserDetail: {
      screen: UserDetailContainer,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <PageStateProvider config={pageStateConfig}>
          <Route />
        </PageStateProvider>
      </View>
    );
  }
}
