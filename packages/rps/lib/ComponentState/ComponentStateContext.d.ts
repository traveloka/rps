/// <reference types="react" />
import * as createReactContext from 'create-react-context';
import { ComponentStateContext, ComponentStateState } from '../types/ComponentState';
export declare const initialState: ComponentStateState;
export declare const Provider: import("react").ComponentClass<createReactContext.ProviderProps<ComponentStateContext>, any>, Consumer: import("react").ComponentClass<createReactContext.ConsumerProps<ComponentStateContext>, any>;
