import React from 'react';
import { View, Button } from 'react-native';
import PageStateProvider from '../PageStateProvider';
import PageStateConsumer from '../PageStateConsumer';
import renderer from 'react-test-renderer';

describe('test PageStateConsumer', () => {
  it('should give setPageState props', () => {
    const Comp = (props) => <View {...props} />
    const root = renderer.create(
      <PageStateProvider>
        <PageStateConsumer>{props => <Comp {...props} />}</PageStateConsumer>
      </PageStateProvider>
    ).root;
    expect(root.findByType(Comp).props.setPageState).toBeTruthy();
  });

  it('should give resetPageState props', () => {
    const Comp = (props) => <View {...props} />
    const root = renderer.create(
      <PageStateProvider>
        <PageStateConsumer>{props => <Comp {...props} />}</PageStateConsumer>
      </PageStateProvider>
    ).root;
    expect(root.findByType(Comp).props.resetPageState).toBeTruthy();
  });

  it('should give reset props', () => {
    const Comp = (props) => <View {...props} />
    const root = renderer.create(
      <PageStateProvider>
        <PageStateConsumer>{props => <Comp {...props} />}</PageStateConsumer>
      </PageStateProvider>
    ).root;
    expect(root.findByType(Comp).props.reset).toBeTruthy();
  });

  it('setPageState should update provider state', () => {
    const Loading = props => <View />;
    const config = {
      page: {
        loading: Loading,
      },
    };

    const root = renderer.create(
      <PageStateProvider config={config}>
        <PageStateConsumer>
          {({ setPageState }) => <Button title='test' onPress={() => setPageState('page', { type: 'loading' })} />}
        </PageStateConsumer>
      </PageStateProvider>
    ).root;

    expect(() => root.findByType(Loading)).toThrow();

    root.findByType(Button).props.onPress();

    const instance = root.instance;
    expect(instance.state.page.type).toEqual('loading');
    expect(root.findByType(Loading)).toBeTruthy();
  });

  it('should throw error when there is no PageStateProvider', () => {
    expect(() => {
      renderer.create(
        <PageStateConsumer>
          {({ setPageState }) => <Button title='test' onPress={() => setPageState('page', { type: 'loading' })} />}
        </PageStateConsumer>
      );
    }).toThrow();
  });
});
