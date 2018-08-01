import React, { Component } from 'react';

import PageStateConsumer from '../PageStateConsumer';
import hoistNonReactStatics from 'hoist-non-react-statics';

export default function withPageStateComponent(config) {
  return WrapperComponent => {
    let Comp = class extends Component {
      render() {
        return (
          <PageStateConsumer>
            {propsConsumer => <WrapperComponent {...this.props} {...propsConsumer} />}
          </PageStateConsumer>
        );
      }
    };
    Comp = hoistNonReactStatics(Comp, WrapperComponent);
    return Comp;
  };
}
