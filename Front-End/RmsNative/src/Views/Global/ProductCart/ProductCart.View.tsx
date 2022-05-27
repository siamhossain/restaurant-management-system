import React, {Fragment, ReactElement} from 'react';
import {ProductCartScreen} from "@/Components/Screens/Global/ProductCart";

class ProductCartView extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <Fragment>
                <ProductCartScreen/>
            </Fragment>
        );
    }
}

export default ProductCartView;
