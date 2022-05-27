import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {PrepareNamespace} from "@/App/Functions/Core";
import {PackageConfig} from "@/App/Config/Package";
import {SetThemeStoreState} from "@/App/WaterTank/Actions/Core/Theme";

export type IAppTheme = 'light' | 'dark';

export class ThemeProvider extends ServiceProvider {
    public key: string;

    protected initialTheme: IAppTheme;

    constructor() {
        super();
        this.initialTheme = 'light';
        this.key = PrepareNamespace(PackageConfig.PackageCode, "appTheme", ".");
    }

    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public getCurrentTheme(): IAppTheme {
        const value = window.localStorage.getItem(this.key);
        return (value === null || typeof value === "undefined") ? this.initialTheme : (value === 'dark' ? 'dark' : 'light');
    }

    public setTheme(theme: IAppTheme): void {
        window.localStorage.setItem(this.key, theme);
        SetThemeStoreState(() => ({
            appTheme: theme,
        }));
    }

    public static parse(light: string, dark: string, currentTheme: IAppTheme): string {
        return currentTheme === 'light' ? light : dark;
    }
}
