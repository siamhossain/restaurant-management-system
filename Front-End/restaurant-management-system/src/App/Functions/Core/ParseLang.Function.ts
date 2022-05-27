/**
 * Parse the language
 * @param en {string}
 * @param bn {string}
 * @param currentLang {IAppLang}
 * @constructor
 */
import {IAppLang, LocaleProvider} from "@/App/Services/Providers/Core/Locale";

export function ParseLang(en: string, bn: string, currentLang: IAppLang): string {
    return LocaleProvider.parse(en, bn, currentLang);
}
