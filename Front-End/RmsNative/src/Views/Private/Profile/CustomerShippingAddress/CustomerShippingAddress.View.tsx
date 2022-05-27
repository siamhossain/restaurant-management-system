import React, {Fragment, ReactElement} from 'react';
import {CustomerShippingAddressScreen} from "@/Components/Screens/Private/Profile/CustomerShippingAddress";

class CustomerShippingAddressView extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <Fragment>
                <CustomerShippingAddressScreen/>
            </Fragment>
        );
    }
}

export default CustomerShippingAddressView;
