import React, {Fragment, ReactElement} from 'react';
import {ProductDetailsScreen} from "@/Components/Screens/Global/ProductDetails";

class ProductDetailsView extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <Fragment>
                <ProductDetailsScreen/>
            </Fragment>
        );
    }
}

export default ProductDetailsView;
