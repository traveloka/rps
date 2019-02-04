import * as React from 'react';
import { ComponentStateState } from '../types/ComponentState';
export default class ComponentStateProvider extends React.Component<any, ComponentStateState> {
    private mount;
    state: ComponentStateState;
    constructor(props: any);
    componentWillUnmount(): void;
    render(): JSX.Element;
    private setLoading;
    private setError;
    private setResult;
    private getContext;
}
