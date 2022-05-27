import React, { Fragment, ReactElement } from 'react';
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {HeadlineBannerScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/HeadlineBanner";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/Footer";
import {CheckoutScreen} from "@/Components/Screens/Private/StoreFront/Plutokitchen/Customer/Checkout";

const CheckoutView = (): ReactElement => {
    return (
        <Fragment>
            <HeaderScreen/>
            <HeadlineBannerScreen title={"Plutokitchen"} sub_title={"Plutokitchen"}/>
            <CheckoutScreen/>
            <FooterScreen/>
        </Fragment>
    );
};

export default CheckoutView;
