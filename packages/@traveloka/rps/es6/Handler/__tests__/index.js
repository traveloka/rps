import React from 'react';
import Handler from '../../Handler';
import { View } from 'react-native';
import renderer from 'react-test-renderer';

describe('test Handler', () => {
  it('should render nothing since type not in config', () => {
    const config = {
      snackbar: {
        loading: View
      }
    };
    const instance = renderer.create(<Handler config={config} />).root;
    expect(instance.children.length).toEqual(0);
  });

  it('should render correct component by type', () => {
    const config = {
      loading: View
    };
    const instance = renderer.create(<Handler config={config} type='loading' />).root;
    expect(instance.findByType(View)).toBeTruthy();
  });
});
