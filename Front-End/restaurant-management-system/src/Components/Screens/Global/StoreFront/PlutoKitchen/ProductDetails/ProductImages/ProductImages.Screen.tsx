import React, {Fragment, ReactElement} from 'react';
import BurgerMagnifyImage from "@/Static/Images/StoreFront/PlutoKitchen/Details page/img_Burger_magnify.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {MagnifyScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/ProductDetails/Magnify";
import {ProductImagesStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/ProductImages";

// const __css_product_images_wrapper = css`
//   .singleSmallImg {
//     margin-right: 7px;
//     img{
//       width: 70px;
//       height: 50px;
//       border-radius: 5px;
//     }
//   }
//   .procuct_image_slider {
//     margin-top: 15px;
//   }
//   .slick-next:before {
//     content: "\\276F";
//     z-index: 500;
//     font-family: auto;
//     font-weight: bold;
//     font-size: 22px;
//     color: #000000;
//   }
//   .slick-prev:before {
//     content: "\\276E";
//     z-index: 500;
//     font-family: auto;
//     font-weight: bold;
//     font-size: 22px;
//     color: #000000;
//   }
//   .slick-prev {
//     left: 10px;
//     z-index: 500;
//     background: #ffffff;
//     opacity: 0.5;
//     :hover {
//       left: 10px;
//       z-index: 500;
//       background: #ffffff;
//       opacity: 0.5;
//     }
//   }
//   .slick-next {
//     right: 10px;
//     z-index: 500;
//     background: #ffffff;
//     opacity: 0.5;
//     :hover {
//       right: 10px;
//       z-index: 500;
//       background: #ffffff;
//       opacity: 0.5;
//     }
//   }
//
// `;


const ProductImagesScreen = (): ReactElement => {



    return (
        <Fragment>
            <div className={ProductImagesStyleSheet.classes.root}>
                    <MagnifyScreen
                        width={"100%"}
                        height={"500px"}
                        containerStyle={{
                            borderRadius: 10
                        }}
                        imageSource={BurgerMagnifyImage}
                        previewContainerProps={{
                            imageZoomSize: 900,
                        }}
                    />


                <div className="procuct_image_slider">
                        <div className="singleSmallImg">
                            <img src={BurgerMagnifyImage} alt={"Logo"}/>
                        </div>
                        <div className="singleSmallImg">
                            <img src={BurgerMagnifyImage} alt={""}/>
                        </div>
                </div>

            </div>
        </Fragment>
    );
};

export {ProductImagesScreen};
