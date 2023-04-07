declare const _sfc_main: import("vue").DefineComponent<{
    thousand: {
        type: BooleanConstructor;
        default: boolean;
    };
    needSymbol: {
        type: BooleanConstructor;
        default: boolean;
    };
    symbol: {
        type: StringConstructor;
        default: string;
    };
    price: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    decimalPoint: {
        type: NumberConstructor;
        default: number;
    };
}, {
    getDecimal: import("vue").ComputedRef<string>;
    getSymbol: import("vue").ComputedRef<string>;
    getThousand: import("vue").ComputedRef<string | number>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, never[], never, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    thousand: {
        type: BooleanConstructor;
        default: boolean;
    };
    needSymbol: {
        type: BooleanConstructor;
        default: boolean;
    };
    symbol: {
        type: StringConstructor;
        default: string;
    };
    price: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    decimalPoint: {
        type: NumberConstructor;
        default: number;
    };
}>> & {}, {
    symbol: string;
    price: string | number;
    thousand: boolean;
    needSymbol: boolean;
    decimalPoint: number;
}>;
export default _sfc_main;
