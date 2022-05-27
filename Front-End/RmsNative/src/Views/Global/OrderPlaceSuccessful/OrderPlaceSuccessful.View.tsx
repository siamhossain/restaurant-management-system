import React, {Fragment, ReactElement} from 'react';
import {OrderPlaceSuccessfulScreen} from "@/Components/Screens/Global/OrderPlaceSuccessful";

class OrderPlaceSuccessfulView extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <Fragment>
                <OrderPlaceSuccessfulScreen/>
            </Fragment>
        );
    }
}

export default OrderPlaceSuccessfulView;
