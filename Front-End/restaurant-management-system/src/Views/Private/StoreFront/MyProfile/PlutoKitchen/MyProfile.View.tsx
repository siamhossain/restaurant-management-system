import React, { Fragment, ReactElement } from 'react';
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {HeadlineBannerScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/HeadlineBanner";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/Footer";
import {MyProfileScreen} from "@/Components/Screens/Private/StoreFront/Plutokitchen/Customer/MyProfile";

const MyProfileView = (): ReactElement => {
    return (
        <Fragment>
            <HeaderScreen/>
            <HeadlineBannerScreen title={"My Profile"} sub_title={"My Profile"} />
            <MyProfileScreen/>
            <FooterScreen/>
        </Fragment>
    );
};

export default MyProfileView;
