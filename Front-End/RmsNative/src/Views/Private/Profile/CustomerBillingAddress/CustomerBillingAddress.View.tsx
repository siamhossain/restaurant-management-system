import React, {Fragment, ReactElement} from 'react';
import {View} from "react-native";
import {CustomerBillingAddressScreen} from "@/Components/Screens/Private/Profile/CustomerBillingAddress";

class CustomerBillingAddressView extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <Fragment>
                <View>
                    <CustomerBillingAddressScreen/>
                </View>
            </Fragment>
        );
    }
}

export default CustomerBillingAddressView;
