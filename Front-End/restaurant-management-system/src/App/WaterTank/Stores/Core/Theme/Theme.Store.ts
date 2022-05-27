import { StoreProvider as Store } from '@/App/Services/Providers/Core/WaterTank';
import { actionTypes } from "@/App/WaterTank/Actions/Core/Theme";
import {IAppTheme, ThemeProvider} from "@/App/Services/Providers/Core/Theme";

export interface IThemeStoreState {
    appTheme: IAppTheme,
}

class ThemeStore extends Store {
    protected actionTypes: typeof actionTypes = actionTypes;
    public initialState: IThemeStoreState;
    public state: IThemeStoreState;

    constructor() {
        super();

        this.initialState = {
            appTheme: new ThemeProvider().getCurrentTheme(),
        };

        this.state = this.initialState;
    }
}

const __ThemeStore = new ThemeStore();
export {__ThemeStore as ThemeStore};
