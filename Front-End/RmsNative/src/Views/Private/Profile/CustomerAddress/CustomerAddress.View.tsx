import React, {Fragment, ReactElement} from 'react';
import {View} from "react-native";
import {CustomerAddressScreen} from "@/Components/Screens/Private/Profile/CustomerAddress";

class CustomerAddressView extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <Fragment>
                <View>
                    <CustomerAddressScreen/>
                </View>
            </Fragment>
        );
    }
}

export default CustomerAddressView;
