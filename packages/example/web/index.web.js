import React from 'react';
import { AppRegistry } from 'react-native';
import { AppContainer } from 'react-hot-loader';
import App from '@example/shared/App';

const renderApp = () => (
  <AppContainer>
    <App />
  </AppContainer>
);

AppRegistry.registerComponent('DistrictTemplate', () => renderApp);

if (module.hot) {
  // $FlowFixMe
  module.hot.accept();

  const renderHotApp = () => (
    <AppContainer>
      <App />
    </AppContainer>
  );

  // App registration and rendering
  AppRegistry.registerComponent('DistrictTemplate', () => renderHotApp);
}

AppRegistry.runApplication('DistrictTemplate', {
  rootTag: document.getElementById('root'),
});
