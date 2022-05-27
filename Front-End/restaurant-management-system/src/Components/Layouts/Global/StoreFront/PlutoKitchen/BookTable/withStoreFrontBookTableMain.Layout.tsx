import React, { Fragment, ReactElement } from 'react';
import {BookTableMainLayout} from "@/Components/Layouts/Global/StoreFront/PlutoKitchen/BookTable/BookTableMain.Layout";

function withStoreFrontBookTableMainLayout<p>(WrappedComponent: React.ComponentType<p>, pageTitle: string): React.ComponentType<p> {
    return (props: p) => {

        React.useEffect(() => {
            document.title = pageTitle;
        });

        return (
            <BookTableMainLayout>
                <WrappedComponent {...props as p}/>
            </BookTableMainLayout>

        )
    }
}

export { withStoreFrontBookTableMainLayout };
