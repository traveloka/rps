import * as React from 'react';
import { Payload } from '../../types/PageState';
declare type HandlerProps = {
    payload?: Payload;
    component?: React.ComponentType<any>;
};
declare const HandlerComponent: React.SFC<HandlerProps>;
export default HandlerComponent;
