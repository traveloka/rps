import * as React from 'react';
import { PageStateProps, PageStateContext } from '../types/PageState';
declare type PageStateState = {};
export default class PageStateProvider extends React.Component<PageStateProps, PageStateState> {
    static defaultProps: PageStateProps;
    private mount;
    state: PageStateState;
    componentWillUnmount(): void;
    setPageState: (path: any, value?: any) => void;
    resetPageState: (...args: any) => void;
    getConfig: () => {};
    reset: () => void;
    getStateComponent: (path: string) => React.StatelessComponent<any>;
    getContext(): PageStateContext;
    render(): JSX.Element;
}
export {};
