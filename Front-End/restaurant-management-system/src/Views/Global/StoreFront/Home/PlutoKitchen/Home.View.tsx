import React, { Fragment, ReactElement } from 'react';
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {AboutUsScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/AboutUs";
import {HeroSliderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/HeroSlider";
import {ServicesScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Services";
import {FoodReviewsScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/FoodReviews";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Footer";
import {GalleryScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Gallery";
import {SpecialMenuScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/SpecialMenu";
import {FoodBlogScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/FoodBlog";
import {FoodItemsScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/FoodItems";
import { withStoreFrontMainLayout } from '@/Components/Layouts/Global/StoreFront/PlutoKitchen/Main';
import {storeFrontPageTitle} from "@/App/Functions/Custom/storeFrontPageTitle.Function";
import {withStoreFrontBookTableMainLayout} from "@/Components/Layouts/Global/StoreFront/PlutoKitchen/BookTable";



const HomeView = (): ReactElement => {
    return (
        <Fragment>
            <HeroSliderScreen/>
            <FoodItemsScreen/>
            <AboutUsScreen/>
            <SpecialMenuScreen/>
            <ServicesScreen/>
            <GalleryScreen/>
            <FoodReviewsScreen/>
            <FoodBlogScreen/>
        </Fragment>
    );

};

export default withStoreFrontBookTableMainLayout(HomeView, storeFrontPageTitle("Home"));
