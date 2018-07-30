import React, { Component } from 'react';

import PageStateProvider from '../PageStateProvider';
import hoistNonReactStatics from 'hoist-non-react-statics';

export default function withPageStateProvider(config = {}, propsConfig = {}) {
  return WrapperComponent => {
    let Comp = class extends Component {
      render() {
        return (
          <PageStateProvider config={config} {...propsConfig}>
            <WrapperComponent {...this.props} />
          </PageStateProvider>
        );
      }
    };
    Comp = hoistNonReactStatics(Comp, WrapperComponent);
    return Comp;
  };
}
