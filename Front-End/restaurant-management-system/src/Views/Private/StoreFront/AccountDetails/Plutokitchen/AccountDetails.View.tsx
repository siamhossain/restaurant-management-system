import React, { Fragment, ReactElement } from 'react';
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {HeadlineBannerScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/HeadlineBanner";
import {AccountDetailsScreen} from "@/Components/Screens/Private/StoreFront/Plutokitchen/Customer/AccountDetails";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/Footer";

const AccountDetailsView = (): ReactElement => {
    return (
        <Fragment>
            <HeaderScreen/>
            <HeadlineBannerScreen title={"My Account"} sub_title={"My Account"}/>
            <AccountDetailsScreen/>
            <FooterScreen/>
        </Fragment>
    );
};

export default AccountDetailsView;
