import React, { Fragment, ReactElement } from 'react';
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {HeadlineBannerScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/HeadlineBanner";
import {ExperienceInfoScreen, ExperienceScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/About/Experience";
import {ElementorScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/About/Elementor";
import {ChefsScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/About/Chefs";
import {FoodReviewsScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/FoodReviews";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/About/Footer";
import {withStoreFrontGetInTouchMainLayout} from "@/Components/Layouts/Global/StoreFront/PlutoKitchen/GetInTouch";
import {storeFrontPageTitle} from "@/App/Functions/Custom/storeFrontPageTitle.Function";

const AboutView = (): ReactElement => {
    return (
        <Fragment>
             <HeadlineBannerScreen title={"About Us"} sub_title={"About us"}/>
             <ExperienceScreen/>
             <ElementorScreen/>
             <ChefsScreen/>
             <FoodReviewsScreen/>
        </Fragment>
    );
};

export default withStoreFrontGetInTouchMainLayout(AboutView, storeFrontPageTitle('About'));
