import React from 'react';
import {useTheme} from "./index";
import {IAppTheme, ThemeProvider} from "@/App/Services/Providers/Core/Theme";

export type IThemeParser = (light: string, dark: string) => string;
export type {IAppTheme};

interface IWithThemeInjectedProps {
    __theme: IThemeParser;
    appTheme: IAppTheme;
}

export const withTheme = <T extends IWithThemeInjectedProps>(
    Component: React.ComponentType<T>
): React.SFC<Pick<T, Exclude<keyof T, keyof IWithThemeInjectedProps>>> => (props: Omit<T, keyof IWithThemeInjectedProps>) => {

    const appTheme: IAppTheme = useTheme();
    const lang: IThemeParser = (light: string, dark: string) => {
        return ThemeProvider.parse(light, dark, appTheme);
    }

    return <Component {...props as T} __theme={lang} appTheme={appTheme}/>;
};
