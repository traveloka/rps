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
});
