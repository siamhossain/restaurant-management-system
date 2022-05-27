import React, { Fragment, ReactElement } from 'react';
import {CartScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Cart";
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {HeadlineBannerScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/HeadlineBanner";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/Footer";

const CartView = (): ReactElement => {
    return (
        <Fragment>
            <HeaderScreen/>
            <HeadlineBannerScreen title={"Cart"} sub_title={"Cart"}/>
            <CartScreen/>
            <FooterScreen/>
        </Fragment>
    );
};

export default CartView;
