import React, { Fragment, ReactElement } from 'react';
import {AddressScreen} from "@/Components/Screens/Private/StoreFront/Plutokitchen/Customer/Address";
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {HeadlineBannerScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/HeadlineBanner";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/Footer";

const AddressView = (): ReactElement => {
    return (
        <Fragment>
            <HeaderScreen/>
            <HeadlineBannerScreen title={"My Account"} sub_title={"My Account"}/>
            <AddressScreen/>
            <FooterScreen/>
        </Fragment>
    );
};

export default AddressView;
