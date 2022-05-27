import React, { Fragment, ReactElement } from 'react';
import {EditProfileScreen} from "@/Components/Screens/Private/StoreFront/Plutokitchen/Customer/EditProfile";
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/Footer";

const EditProfileView = (): ReactElement => {
    return (
        <Fragment>
            <HeaderScreen/>
            <EditProfileScreen/>
            <FooterScreen/>
        </Fragment>
    );
};

export default EditProfileView;
