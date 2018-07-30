const mockPageStateMethod = jest.fn(config => config);
const mockWithPageStateComponent = jest.fn(config => config);

jest.mock('../pageStateMethod', () => config => mockPageStateMethod);
jest.mock('../withPageStateComponent', () => config => mockWithPageStateComponent);

import pageState from '../pageState';

describe('test pageState hoc', () => {
  beforeEach(() => {
    mockPageStateMethod.mockReset();
    mockWithPageStateComponent.mockReset();
  });

  it('should call method hoc when giving object descriptor', () => {
    const obj = {};
    pageState()(obj, 'componentDidMount', {
      value: () => {}, // eslint-disable-line no-empty-function
    });
    expect(mockPageStateMethod).toHaveBeenCalled();
    expect(mockWithPageStateComponent).not.toHaveBeenCalled();
  });

  it('should call class hoc when giving class definition', () => {
    const classDef = class A {};
    pageState()(classDef);
    expect(mockPageStateMethod).not.toHaveBeenCalled();
    expect(mockWithPageStateComponent).toHaveBeenCalled();
  });
});
