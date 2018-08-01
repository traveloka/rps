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
          {({ setPageState }) => <Button title='test' onPress={() => setPageState('page.loading', {})} />}
        </PageStateConsumer>
      </PageStateProvider>
    ).root;

    expect(() => root.findByType(Loading)).toThrow();

    root.findByType(Button).props.onPress();

    const instance = root.instance;
    expect(instance.state['page.loading']).toBeTruthy();
    expect(root.findByType(Loading)).toBeTruthy();
  });

  it('resetPageState should remove element component', () => {
    const Loading = props => <View />;
    const config = {
      page: {
        loading: Loading,
      },
    };

    const root = renderer.create(
      <PageStateProvider config={config}>
        <PageStateConsumer>
          {({ setPageState, resetPageState }) => <Button title='test' setPageState={setPageState} resetPageState={resetPageState} />}
        </PageStateConsumer>
      </PageStateProvider>
    ).root;

    expect(() => root.findByType(Loading)).toThrow();

    root.findByType(Button).props.setPageState('page.loading', {});
    expect(root.findByType(Loading)).toBeTruthy();

    root.findByType(Button).props.resetPageState('page.loading');
    expect(() => root.findByType(Loading)).toThrow();
  });

  it('reset should remove all element component', () => {
    const Loading1 = props => <View />;
    const Loading2 = props => <View />;
    const config = {
      page: {
        loading1: Loading1,
        loading2: Loading2,
      },
    };

    const root = renderer.create(
      <PageStateProvider config={config}>
        <PageStateConsumer>
          {({ setPageState, resetPageState, reset }) => <Button title='test' setPageState={setPageState} resetPageState={resetPageState} reset={reset} />}
        </PageStateConsumer>
      </PageStateProvider>
    ).root;

    expect(() => root.findByType(Loading1)).toThrow();
    expect(() => root.findByType(Loading2)).toThrow();

    root.findByType(Button).props.setPageState('page.loading1', {});
    root.findByType(Button).props.setPageState('page.loading2', {});
    expect(root.findByType(Loading1)).toBeTruthy();
    expect(root.findByType(Loading2)).toBeTruthy();

    root.findByType(Button).props.reset();
    expect(() => root.findByType(Loading1)).toThrow();
    expect(() => root.findByType(Loading2)).toThrow();
  });

  it('should throw error when there is no PageStateProvider', () => {
    expect(() => {
      renderer.create(
        <PageStateConsumer>
          {({ setPageState }) => <Button title='test' onPress={() => setPageState('page.loading', {})} />}
        </PageStateConsumer>
      );
    }).toThrow();
  });
});
