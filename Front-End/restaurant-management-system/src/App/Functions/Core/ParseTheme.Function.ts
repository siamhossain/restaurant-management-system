/**
 * Parse the Theme
 * @param light {string}
 * @param dark {string}
 * @param currentTheme {IAppTheme}
 * @constructor
 */
import {IAppTheme, ThemeProvider} from "@/App/Services/Providers/Core/Theme";

export function ParseTheme(light: string, dark: string, currentTheme: IAppTheme): string {
    return ThemeProvider.parse(light, dark, currentTheme);
}
