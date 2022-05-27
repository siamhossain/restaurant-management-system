import React, { Fragment, ReactElement } from 'react';
import {MainLayout} from "@/Components/Layouts/Global/StoreFront/PlutoKitchen/Main/Main.Layout";

function withStoreFrontMainLayout<p>(WrappedComponent: React.ComponentType<p>, pageTitle: string): React.ComponentType<p> {
    return (props: p) => {

        React.useEffect(() => {
            document.title = pageTitle;
        });

        return (
            <MainLayout>
                <WrappedComponent {...props as p}/>
            </MainLayout>
        )
    }
}

export { withStoreFrontMainLayout };
