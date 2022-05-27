import { StoreProvider as Store } from '@/App/Services/Providers/Core/WaterTank';
import { actionTypes } from "@/App/WaterTank/Actions/Core/Locale";
import {IAppLang, LocaleProvider} from "@/App/Services/Providers/Core/Locale";

export interface ILocaleSettingsStoreState {
    appLang: IAppLang,
}

class LocaleSettingsStore extends Store {
    protected actionTypes: typeof actionTypes = actionTypes;
    public initialState: ILocaleSettingsStoreState;
    public state: ILocaleSettingsStoreState;

    constructor() {
        super();

        this.initialState = {
            appLang: new LocaleProvider().getCurrentLang(),
        };

        this.state = this.initialState;
    }
}

const __LocaleSettingsStore = new LocaleSettingsStore();
export {__LocaleSettingsStore as LocaleSettingsStore};
