import React, { Fragment, ReactElement } from 'react';
import {ContactPageScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Contact/ContactPage";
import {HeadlineBannerScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/HeadlineBanner";
import {withStoreFrontMainLayout} from "@/Components/Layouts/Global/StoreFront/PlutoKitchen/Main";
import {storeFrontPageTitle} from "@/App/Functions/Custom/storeFrontPageTitle.Function";

const ContactPageView = (): ReactElement => {
    return (
        <Fragment>
            <HeadlineBannerScreen title={"Contact"} sub_title={"Contact"}/>
            <ContactPageScreen/>
        </Fragment>
    );
};

export default withStoreFrontMainLayout(ContactPageView, storeFrontPageTitle("Contact"));
