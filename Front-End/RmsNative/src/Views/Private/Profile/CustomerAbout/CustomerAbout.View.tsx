import React, {Fragment, ReactElement} from 'react';
import {CustomerAboutScreen} from "@/Components/Screens/Private/Profile/CustomerAbout";

class CustomerAboutView extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <Fragment>
                <CustomerAboutScreen/>
            </Fragment>
        );
    }
}

export default CustomerAboutView;
