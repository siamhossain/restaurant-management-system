interface IPaddingProps {
    top?: number,
    left?: number,
    right?: number,
    bottom?: number,
    all?: number,
}

export function Padding(paddingProps: IPaddingProps): any {
    return {
        paddingTop: paddingProps.all ? paddingProps.all : paddingProps.top,
        paddingLeft: paddingProps.all ? paddingProps.all : paddingProps.left,
        paddingRight: paddingProps.all ? paddingProps.all : paddingProps.right,
        paddingBottom: paddingProps.all ? paddingProps.all : paddingProps.bottom,
    };
}
