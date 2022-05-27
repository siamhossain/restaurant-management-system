import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {PrepareNamespace} from "@/App/Functions/Core";
import {SetLocalSettingsStoreState} from "@/App/WaterTank/Actions/Core/Locale";
import {PackageConfig} from "@/App/Config/Package";

export type IAppLang = 'en' | 'bn';

export class LocaleProvider extends ServiceProvider {
    public key: string;

    public initialLang: IAppLang;

    constructor() {
        super();

        this.key = PrepareNamespace(PackageConfig.PackageCode, "appLang", ".");
        this.initialLang = 'en';
    }

    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public getCurrentLang(): IAppLang {
        const value = window.localStorage.getItem(this.key);
        return (value === null || typeof value === "undefined") ? this.initialLang : (value === 'bn' ? 'bn' : 'en');
    }

    public setLang(langName: IAppLang): void {
        window.localStorage.setItem(this.key, langName);
        SetLocalSettingsStoreState(() => ({
            appLang: langName,
        }));
    }

    public static parse(en: string, bn: string, currentLang: IAppLang): string {
        return currentLang === 'en' ? en : bn;
    }
}
