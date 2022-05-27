import { PrepareNamespace } from "@/App/Functions/Core";
import {Dispatcher} from "@/App/Services/Providers/Core/WaterTank";
import {ILocaleSettingsStoreState, LocaleSettingsStore} from "@/App/WaterTank/Stores/Core/Locale";
import {DeepPartial} from "@/App/Types/Core";

const Namespace: string = "APP/APP_LOCALE";

export const actionTypes: { SET_STATE: string } = {
    SET_STATE: PrepareNamespace(Namespace, 'SET_STATE'),
};

export function SetLocalSettingsStoreState(payload: (state: ILocaleSettingsStoreState) => DeepPartial<ILocaleSettingsStoreState>): void {
    Dispatcher.dispatch({
        type: actionTypes.SET_STATE,
        payload: payload(LocaleSettingsStore.__bindActionTypes<ILocaleSettingsStoreState>(actionTypes).state),
    });
}
