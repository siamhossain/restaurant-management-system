export const prepareStoreContainerObject = (store: any, updateState: any, currentState: any) => ({
    store,
    changeHandler(state: any) {
        updateState({
            ...currentState,
            [store.constructor.name]: state,
        });
    },
});


export const WTDebuggerActions = {
    __getTheme(): string {
        const defaultTheme: string = "rjv-default";
        const sessionThemeKey = window.localStorage['rcw.waterTank.debugger.stored.theme'];
        return (sessionThemeKey === "" || sessionThemeKey === null || typeof sessionThemeKey === "undefined") ? defaultTheme : sessionThemeKey;
    },
    __logTheme(theme: string): void {
        window.localStorage['rcw.waterTank.debugger.stored.theme'] = theme;
    },
    __getFullScreen(): boolean {
        const defaultState: string = "1";
        let fullScreenKey = window.localStorage['rcw.waterTank.debugger.stored.fullscreen'];
        fullScreenKey = (fullScreenKey === "" || fullScreenKey === null || typeof fullScreenKey === "undefined") ? defaultState : fullScreenKey;
        return fullScreenKey.toString() === "1";
    },
    __logFullScreen(fullScreen: boolean): void {
        window.localStorage['rcw.waterTank.debugger.stored.fullscreen'] = (fullScreen ? "1" : "0");
    }
}
