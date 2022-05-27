import { PrepareNamespace } from "@/App/Functions/Core";
import { Dispatcher } from "@/App/Services/Providers/Core/WaterTank";
import {DeepPartial} from "@/App/Types/Core";
import {IThemeStoreState, ThemeStore} from "@/App/WaterTank/Stores/Core/Theme";

/**
 * @var Namespace {string}
 * The namespace of the store access
 */
const Namespace: string = "APP/APP_THEME"; //Must be unique

/**
 * @var actionTypes {object}
 * Declare your action types here
 * You can update/add action types if you need
 */
export const actionTypes: { SET_STATE: string } = {
    SET_STATE: PrepareNamespace(Namespace, 'SET_STATE'),
};

/**
 * Set the state by calling the following method
 * You can customize it if you need
 * @constructor
 * @param payload
 */
export function SetThemeStoreState(payload: (state: IThemeStoreState) => DeepPartial<IThemeStoreState>): void {
    Dispatcher.dispatch({
        type: actionTypes.SET_STATE,
        payload: payload(ThemeStore.__bindActionTypes<IThemeStoreState>(actionTypes).state),
    });
}
