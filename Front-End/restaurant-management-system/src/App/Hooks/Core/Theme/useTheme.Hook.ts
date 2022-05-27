import { useState, useEffect } from 'react';
import {IAppTheme} from "@/App/Services/Providers/Core/Theme";
import {IThemeStoreState, ThemeStore} from '@/App/WaterTank/Stores/Core/Theme';

export function useTheme(): IAppTheme {
    const [appTheme, setAppTheme] = useState<IAppTheme>(ThemeStore.getState().appTheme);

    const onChangeState = (state: IThemeStoreState): void => {
        setAppTheme(state.appTheme);
    };

    useEffect(() => {
        //Hook boots up
        ThemeStore.addChangeListener(onChangeState);
        return () => ThemeStore.removeChangeListener(onChangeState);
    }, []);

    return appTheme;
}
