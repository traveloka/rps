declare enum States {
    LOADING = "loading",
    ERROR = "error",
    SUCCESS = "success"
}
declare type pageStateMethodConfig = {
    [k in States]?: string;
};
export declare function mergePayload(path: string, _payload: any, _mergedPayload: any, props: any): any[];
export declare function translatePayload(config: any, props?: any): any[];
export default function pageStateMethod(config?: pageStateMethodConfig): (a: any, b: any, c: any) => void;
export {};
