import React, {Fragment, ReactElement} from 'react';
import {View} from "react-native";
import {CustomerOrderDetailsScreen} from "@/Components/Screens/Private/Profile/CustomerOrderDetails";

class CustomerOrderDetailsView extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <Fragment>
                <View>
                    <CustomerOrderDetailsScreen/>
                </View>

            </Fragment>
        );
    }
}

export default CustomerOrderDetailsView;
