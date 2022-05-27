import {useState, useEffect} from 'react';
import {ILocaleSettingsStoreState, LocaleSettingsStore} from "@/App/WaterTank/Stores/Core/Locale";
import {IAppLang} from "@/App/Services/Providers/Core/Locale";

export function useLocale(): IAppLang {
    const [appLang, setAppLang] = useState<IAppLang>(LocaleSettingsStore.getState().appLang);

    const onChangeState = (state: ILocaleSettingsStoreState): void => {
        setAppLang(state.appLang);
    };

    useEffect(() => {
        //Hook boots up
        LocaleSettingsStore.addChangeListener(onChangeState);
        return () => LocaleSettingsStore.removeChangeListener(onChangeState);
    }, []);

    return appLang;
}
