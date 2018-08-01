/* eslint-disable no-unused-vars */

import pageStateMethod, { translatePayload } from '../pageStateMethod';

describe('test translatePayload', () => {
  it('should give correct config by given string', () => {
    const [path, payload] = translatePayload('snackbar.loading');
    expect(path).toEqual('snackbar.loading');
    expect(payload).toBeTruthy();
  });

  it('should give correct config by given object', () => {
    const [path, payload] = translatePayload({ path: 'snackbar.loading', payload: { title: 'testing' } });
    expect(path).toEqual('snackbar.loading');
    expect(payload).toEqual({
      payload: {
        title: 'testing',
      },
    });
  });
});

describe('test pageStateMethod', () => {
  const mockFetchUser = jest.fn(args => args);

  beforeEach(() => {
    mockFetchUser.mockReset();
  });

  describe('test loading callback', () => {
    it('should call setPageState for loading config', async () => {
      const mockSetPageState = jest.fn();
      const mockResetPageState = jest.fn();
      class TestClass {
        @pageStateMethod({ loading: 'page.loading' })
        handleFetchUser = () => mockFetchUser();
      }
      const obj = new TestClass();
      obj.props = {
        setPageState: mockSetPageState,
        resetPageState: mockResetPageState,
      };
      await obj.handleFetchUser();
      const [firstArg, secondArg] = mockSetPageState.mock.calls[0];
      expect(firstArg).toEqual('page.loading');
      expect(secondArg).toBeTruthy();
      expect(mockResetPageState).toHaveBeenCalled();
    });

    it('should not call setPageState when loading is not defined', async () => {
      const mockSetPageState = jest.fn();
      const mockResetPageState = jest.fn();
      class TestClass {
        @pageStateMethod() handleFetchUser = () => mockFetchUser();
      }
      const obj = new TestClass();
      obj.props = {
        setPageState: mockSetPageState,
        resetPageState: mockResetPageState,
      };
      await obj.handleFetchUser();
      expect(mockSetPageState).not.toHaveBeenCalled();
    });

    // it('should have property cancel', async () => {
    //   const mockSetPageState = jest.fn();
    //   const mockResetPageState = jest.fn();
    //   let testValue = 1;
    //   mockFetchUser.mockReturnValueOnce(new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(2);
    //     }, 1000);
    //   }).then(nextTestVar => {
    //     testValue = nextTestVar;
    //   }));
    //   class TestClass {
    //     @pageStateMethod({ loading: 'page.loading' })
    //     handleFetchUser = () => mockFetchUser();
    //   }
    //   const obj = new TestClass();
    //   obj.props = {
    //     setPageState: mockSetPageState,
    //     resetPageState: mockResetPageState,
    //   };
    //   obj.handleFetchUser();
    //   const [_, secondArg] = mockSetPageState.mock.calls[0];
    //   expect(secondArg.payload.cancel).toBeTruthy();
    //   secondArg.payload.cancel();
    //   await new Promise(resolve => {
    //     setTimeout(() => {
    //       expect(testValue).toEqual(1);
    //       resolve();
    //     }, 100)
    //   })
    //   expect(mockFetchUser.mock.calls.length).toEqual(1);
    //   expect(mockResetPageState).toHaveBeenCalled();
    // });
  });

  it('should call setPageState for success config', async () => {
    mockFetchUser.mockReturnValueOnce(new Promise(resolve => resolve(42)));
    const mockSetPageState = jest.fn();
    const mockResetPageState = jest.fn();
    class TestClass {
      @pageStateMethod({ success: 'page.success' })
      handleFetchUser = () => mockFetchUser();
    }
    const obj = new TestClass();
    obj.props = {
      setPageState: mockSetPageState,
      resetPageState: mockSetPageState,
    };
    await obj.handleFetchUser();
    expect(mockSetPageState).toHaveBeenCalledWith('page.success', { payload: { result: 42 } });
  });

  it('should call setPageState for error config', async () => {
    const mockSetPageState = jest.fn();
    const mockResetPageState = jest.fn();
    mockFetchUser.mockReturnValueOnce(new Promise((_, reject) => reject('ini error message')));
    console.error = jest.fn();
    class TestClass {
      @pageStateMethod({ error: 'page.error' })
      handleFetchUser = () => mockFetchUser();
    }
    const obj = new TestClass();
    obj.props = {
      setPageState: mockSetPageState,
      resetPageState: mockResetPageState,
    };
    await obj.handleFetchUser();
    expect(mockResetPageState).toHaveBeenCalled();
    const [firstArg, secondArg] = mockSetPageState.mock.calls[0];
    expect(firstArg).toEqual('page.error');
    expect(secondArg.payload).toHaveProperty('error', 'ini error message');
  });

  it('should have retry function when error', async () => {
    const mockSetPageState = jest.fn();
    const mockResetPageState = jest.fn();
    mockFetchUser.mockReturnValueOnce(new Promise((_, reject) => reject('ini error message')));
    console.error = jest.fn();
    class TestClass {
      @pageStateMethod({ error: 'page.error' })
      handleFetchUser = () => mockFetchUser();
    }
    const obj = new TestClass();
    obj.props = {
      setPageState: mockSetPageState,
      resetPageState: mockResetPageState,
    };
    await obj.handleFetchUser();
    expect(mockFetchUser.mock.calls.length).toEqual(1);
    const [_, secondArg] = mockSetPageState.mock.calls[0];
    expect(secondArg.payload.retry).toBeTruthy();
    await secondArg.payload.retry();
    expect(mockFetchUser.mock.calls.length).toEqual(2);
  });

  it('should throw an exception where there is no setPageState function', async () => {
    mockFetchUser.mockReturnValueOnce(new Promise(resolve => resolve()));
    console.error = jest.fn();
    class TestClass {
      @pageStateMethod({ error: 'page.error' })
      handleFetchUser = () => mockFetchUser();
    }
    const obj = new TestClass();
    let error;
    try {
      await obj.handleFetchUser();
    } catch (e) {
      error = e;
    }
    expect(error).toBeTruthy();
  });

  it('should passing the arguments too for retry', async () => {
    const mockSetPageState = jest.fn();
    const mockResetPageState = jest.fn();
    const mockFetchUserWithReturn = jest.fn(args => args);
    mockFetchUserWithReturn.mockReturnValueOnce(new Promise((_, reject) => reject('ini error message')));
    console.error = jest.fn();
    class TestClass {
      @pageStateMethod({ error: 'page.error' })
      handleFetchUser = payload => mockFetchUserWithReturn(payload);
    }
    const obj = new TestClass();
    obj.props = {
      setPageState: mockSetPageState,
      resetPageState: mockResetPageState,
    };
    await obj.handleFetchUser(10);
    expect(mockFetchUserWithReturn.mock.calls.length).toEqual(1);
    const [_, secondArg] = mockSetPageState.mock.calls[0];
    expect(secondArg.payload.retry).toBeTruthy();
    const result = await secondArg.payload.retry();
    expect(result).toEqual(10);
  });

  it('should passing the property result in success', async () => {
    const mockSetPageState = jest.fn();
    const mockResetPageState = jest.fn();
    const mockFetchUserWithReturn = jest.fn(args => args);
    mockFetchUserWithReturn.mockReturnValueOnce(new Promise(resolve => resolve(42)));
    class TestClass {
      @pageStateMethod({ success: 'page.success' })
      handleFetchUser = payload => mockFetchUserWithReturn(payload);
    }
    const obj = new TestClass();
    obj.props = {
      setPageState: mockSetPageState,
      resetPageState: mockResetPageState,
    };
    await obj.handleFetchUser(10);
    expect(mockFetchUserWithReturn.mock.calls.length).toEqual(1);
    const [_, secondArg] = mockSetPageState.mock.calls[0];
    expect(secondArg.payload.result).toBeTruthy();
    expect(secondArg.payload.result).toEqual(42);
  });

  it('should accept callback function', async () => {
    const mockSetPageState = jest.fn();
    const mockResetPageState = jest.fn();
    const mockFetchUserWithReturn = jest.fn(args => args);
    mockFetchUserWithReturn.mockReturnValueOnce(new Promise(resolve => resolve(42)));
    const callbackFn = jest.fn();
    class TestClass {
      @pageStateMethod({ success: 'page.success' }, {
        callback: () => new Promise(resolve => {
          callbackFn();
          resolve();
        }),
      })
      handleFetchUser = payload => mockFetchUserWithReturn(payload);
    }
    const obj = new TestClass();
    obj.props = {
      setPageState: mockSetPageState,
      resetPageState: mockResetPageState,
    };
    await obj.handleFetchUser(10);
    expect(mockFetchUserWithReturn.mock.calls.length).toEqual(1);
    expect(callbackFn.mock.calls.length).toEqual(1);
  });
});
