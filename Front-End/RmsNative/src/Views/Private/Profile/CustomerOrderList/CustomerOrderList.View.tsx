import React, {Fragment, ReactElement} from 'react';
import {View} from "react-native";
import {CustomerOrderListScreen} from "@/Components/Screens/Private/Profile/CustomerOrderList";

class CustomerOrderListView extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <Fragment>
                <View>
                    <CustomerOrderListScreen/>
                </View>

            </Fragment>
        );
    }
}

export default CustomerOrderListView;
