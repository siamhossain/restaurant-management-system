import React, { Fragment, ReactElement } from 'react';
import {GetInTouchMainLayout} from "@/Components/Layouts/Global/StoreFront/PlutoKitchen/GetInTouch/GetInTouchMain.Layout";

function withStoreFrontGetInTouchMainLayout<p>(WrappedComponent: React.ComponentType<p>, pageTitle: string): React.ComponentType<p> {
    return (props: p) => {

        React.useEffect(() => {
            document.title = pageTitle;
        });

        return (
            <GetInTouchMainLayout>
                <WrappedComponent {...props as p}/>
            </GetInTouchMainLayout>
        )
    }
}

export { withStoreFrontGetInTouchMainLayout };
