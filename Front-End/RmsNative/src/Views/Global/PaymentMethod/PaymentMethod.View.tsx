import React, {Fragment, ReactElement} from 'react';
import {PaymentMethodScreen} from "@/Components/Screens/Global/PaymentMethod";

class PaymentMethodView extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <Fragment>
                <PaymentMethodScreen/>
            </Fragment>
        );
    }
}

export default PaymentMethodView;
