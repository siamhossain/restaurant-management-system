import React, {Fragment, ReactElement} from 'react';
import {View} from "react-native";
import {CustomerProfileScreen} from "@/Components/Screens/Private/Profile/CustomerProfile";
import {CustomerProfileStyleSheet} from "@/Static/StyleSheets/Private/Profile/CustomerProfile";

export interface ICustomerProfileViewProps {

}

export interface ICustomerProfileViewState {

}

class CustomerProfileView extends React.Component<ICustomerProfileViewProps, ICustomerProfileViewState> {
    render(): ReactElement {
        return (
            <Fragment>
                <View style={CustomerProfileStyleSheet.root}>
                    <CustomerProfileScreen/>
                </View>
            </Fragment>
        );
    }
}

export default CustomerProfileView;
