import React, { Fragment, ReactElement } from 'react';
import {BlogDetailsScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/BlogDetails";
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/Footer";
import {withStoreFrontMainLayout} from "@/Components/Layouts/Global/StoreFront/PlutoKitchen/Main";
import {storeFrontPageTitle} from "@/App/Functions/Custom/storeFrontPageTitle.Function";




const BlogDetailsView = (): ReactElement => {
    return (
        <Fragment>
            <BlogDetailsScreen/>
        </Fragment>
    );
};

export default withStoreFrontMainLayout(BlogDetailsView, storeFrontPageTitle("Blog Details"));
