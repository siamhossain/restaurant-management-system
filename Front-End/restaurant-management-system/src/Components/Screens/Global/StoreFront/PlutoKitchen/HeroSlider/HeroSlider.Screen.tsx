import React, { Fragment, ReactElement } from 'react';
import {HeroSliderStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/HeroSlider"
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import BannerImage from "@/Static/Images/StoreFront/PlutoKitchen/Banner/Banner-image.png";
import BannerImage2 from "@/Static/Images/StoreFront/PlutoKitchen/Banner/banner-2.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {HeroSectionScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/HeroSection";

const HeroSliderScreen = (): ReactElement => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        /*responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]*/
    };

    return (
        <Fragment>
            <div className={HeroSliderStyleSheet.classes.container}>
                <Slider {...settings}>
                    <HeroSectionScreen bgSrc={BannerImage}/>
                    <HeroSectionScreen bgSrc={BannerImage2}/>
                </Slider>
            </div>
        </Fragment>
    );
};

export { HeroSliderScreen };
