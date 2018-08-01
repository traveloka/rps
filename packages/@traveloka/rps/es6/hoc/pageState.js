import pageStateMethod from './pageStateMethod';

import withPageStateComponent from './withPageStateComponent';

export default function pageState(...configs) {
  return function decorator(...toDecorate) {
    if (toDecorate.length === 1) {
      // decorating a class
      return withPageStateComponent(...configs)(...toDecorate);
    }
    // decorating a method
    return pageStateMethod(...configs)(...toDecorate);
  };
}
