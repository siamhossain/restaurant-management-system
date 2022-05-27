import React, {Fragment, ReactElement} from 'react';
import {View} from "react-native";
import {CustomerEditProfileScreen} from "@/Components/Screens/Private/Profile/CustomerEditProfile";

export interface ICustomerProfileViewProps {

}

export interface ICustomerProfileViewState {

}

class CustomerEditProfileView extends React.Component<ICustomerProfileViewProps, ICustomerProfileViewState> {
    render(): ReactElement {
        return (
            <Fragment>
                <View>
                    <CustomerEditProfileScreen/>
                </View>
            </Fragment>
        );
    }
}

export default CustomerEditProfileView;
