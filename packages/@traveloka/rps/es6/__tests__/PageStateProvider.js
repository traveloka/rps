import React from 'react';
import { View } from 'react-native';
import PageStateProvider from '../PageStateProvider';
import renderer from 'react-test-renderer';

describe('test PageStateProvider', () => {
  it('should not render when type is null', () => {
    const SnackbarLoading = props => <View />;
    const SnackbarError = props => <View />;
    const config = {
      snackbar: {
        loading: SnackbarLoading,
        error: SnackbarError,
      },
    };
    const testRoot = renderer.create(
      <PageStateProvider config={config}>
        <View />
      </PageStateProvider>
    ).root;
    expect(() => testRoot.findByType(SnackbarLoading)).toThrow();
    expect(() => testRoot.findByType(SnackbarError)).toThrow();
  });

  it('should regis config component with correct type', () => {
    const SnackbarLoading = props => <View />;
    const SnackbarError = props => <View />;
    const config = {
      snackbar: {
        loading: SnackbarLoading,
        error: SnackbarError,
      },
    };
    const testRoot = renderer.create(
      <PageStateProvider config={config}>
        <View />
      </PageStateProvider>
    ).root;
    const testInstance = testRoot.instance;
    testInstance.setState({
      ['snackbar.loading']: {},
    });
    expect(testRoot.findByType(SnackbarLoading)).toBeTruthy();
    expect(() => testRoot.findByType(SnackbarError)).toThrow();
  });


  it('should render using callback', () => {
    const callbackFn = jest.fn();
    const testRoot = renderer.create(
      <PageStateProvider callback={() => new Promise(resolve => {
        callbackFn();
        resolve();
      })}>
        <View />
      </PageStateProvider>
    ).root;
    expect(callbackFn.mock.calls.length).toEqual(1);
  });
});
