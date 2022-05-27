import React from 'react';
import {useLocale} from "./index";
import {IAppLang, LocaleProvider} from "@/App/Services/Providers/Core/Locale";

export type ILangParser = (en: string, bn: string) => string;
export type {IAppLang};

interface IWithLocalInjectedProps {
    __lang: ILangParser;
    appLang: IAppLang;
}

export const withLocale = <T extends IWithLocalInjectedProps>(
    Component: React.ComponentType<T>
): React.SFC<Pick<T, Exclude<keyof T, keyof IWithLocalInjectedProps>>> => (props: Omit<T, keyof IWithLocalInjectedProps>) => {

    const appLang: IAppLang = useLocale();
    const lang: ILangParser = (en: string, bn: string) => {
        return LocaleProvider.parse(en, bn, appLang);
    }

    return <Component {...props as T} __lang={lang} appLang={appLang}/>;
};
