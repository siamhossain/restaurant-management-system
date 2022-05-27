import React, {Fragment, ReactElement} from "react";
import {getDebuggableStores} from "@/Development/WaterTank/DebuggableStores";
import ReactJson from "react-json-view";
import {WaterTankDebuggerStyleSheet} from "@/App/Services/Providers/Core/WaterTank/Debugger/WaterTankDebugger.StyleSheet";

export const Debugger = ({theme}: {theme: any}): ReactElement => {
    const [state, setState] = React.useState({});
    const [initialStoresLoaded, setInitialStoresLoaded] = React.useState(false);
    const stores = getDebuggableStores(setState, state);

    React.useEffect(() => {
        if(!initialStoresLoaded) {
            let __state = {};
            for (let i = 0; i < stores.length; i++) {
                const storeObject: any = stores[i];
                __state = {
                    ...__state,
                    [storeObject.store.constructor.name]: storeObject.store.getState(),
                }
            }

            setState({
                ...state,
                ...__state
            });
            setInitialStoresLoaded(true);
        }

        for (let i = 0; i < stores.length; i++) {
            const storeObject: any = stores[i];
            storeObject.store.addChangeListener(storeObject.changeHandler);
        }


        return () => {
            for (let i = 0; i < stores.length; i++) {
                const storeObject: any = stores[i];
                storeObject.store.removeChangeListener(storeObject.changeHandler);
            }

            console.clear();
        }
    }, [state, stores, initialStoresLoaded]);

    return (
        <Fragment>
            <ReactJson src={state} theme={theme} style={WaterTankDebuggerStyleSheet.styles.debuggerComponentStyle} />
        </Fragment>
    );
};
