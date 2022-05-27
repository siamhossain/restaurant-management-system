import React, { Fragment, ReactElement } from 'react';
import {CartScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Cart";
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {HeadlineBannerScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/HeadlineBanner";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/Footer";
import {ShopScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Shop";
import {storeFrontPageTitle} from "@/App/Functions/Custom/storeFrontPageTitle.Function";
import {withStoreFrontMainLayout} from "@/Components/Layouts/Global/StoreFront/PlutoKitchen/Main";

const ShopView = (): ReactElement => {
    return (
        <Fragment>
            <HeadlineBannerScreen title={"Shop"} sub_title={"Shop"} />
            <ShopScreen/>
        </Fragment>
    );
};

export default withStoreFrontMainLayout(ShopView, storeFrontPageTitle("Shop"));