import React from 'react';
import Handler from '../../Handler';
import { View } from 'react-native';
import renderer from 'react-test-renderer';

describe('test Handler', () => {
  it('should render nothing since type not in config', () => {
    const instance = renderer.create(<Handler />).root;
    expect(instance.children.length).toEqual(0);
  });

  it('should render correct component by type', () => {
    const instance = renderer.create(<Handler component={View} payload={{ title: 'Expected Title' }} />).root;
    expect(instance.findByType(View)).toBeTruthy();
  });

  it('handler render should not be rendered twice', () => {
    const renderFn = jest.fn();
    function TestView() {
      renderFn();
      return null;
    }

    class ParentView extends React.Component {
      state = {
        counter: 0,
      };
      addCounter() {
        this.setState({
          counter: 0,
        });
      }
      render() {
        return this.props.children(this.state);
      }
    }
    let p = null;
    const instance = renderer.create(
      <ParentView ref={el => (p = el)}>
        {state => <Handler component={TestView} payload={{ title: 'Expected Title' }} />}
      </ParentView>
    ).root;
    expect(renderFn).toHaveBeenCalledTimes(1);
    p.addCounter();
    expect(renderFn).toHaveBeenCalledTimes(1);
  });
});
