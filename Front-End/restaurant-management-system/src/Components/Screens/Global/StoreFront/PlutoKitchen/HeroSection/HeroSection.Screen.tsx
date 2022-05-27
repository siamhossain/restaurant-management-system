import React, { Fragment, ReactElement } from 'react';
import {HeroSliderStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/HeroSlider"
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import BannerImage from "@/Static/Images/StoreFront/PlutoKitchen/Banner/Banner-image.png";

interface IHeroSectionScreenProps {
    bgSrc: string,
}


const HeroSectionScreen: React.FC<IHeroSectionScreenProps> = (props): ReactElement => {

    return (
        <Fragment>
            <div className={HeroSliderStyleSheet.classes.root}>
            <div className="hero-bg" style={{background: "url(" + props.bgSrc + ")"}} >
                <div className={CommonStyleSheet.classes.container}>
                    <div className="content-wrapper">
                        <div className="content-title">
                            <h1>Good Food for <br/><span>Better Health</span></h1>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br/> tempor incididunt ut
                            labore et dolore magna aliqua. Quis viverra
                        </p>
                        <div className="slider-content-button">
                            <button>Order Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    );
};

export { HeroSectionScreen };
