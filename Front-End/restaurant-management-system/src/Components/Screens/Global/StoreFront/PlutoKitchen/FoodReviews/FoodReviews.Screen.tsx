import React, { Fragment, ReactElement } from 'react';
import {FoodReviewCardScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/FoodReviews/FoodReviewCard.Screen";
import ReviewerImage1 from "@/Static/Images/StoreFront/PlutoKitchen/Client Review/01.png";
import ReviewerImage2 from "@/Static/Images/StoreFront/PlutoKitchen/Client Review/02.png";
import {css} from "@emotion/css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";


const __css_reviews_section = css`
    margin-top: 100px;
    margin-bottom: 150px;
    overflow-x: clip;
  @media only screen and (max-width: 900px) {
    margin-top: 0;
    margin-bottom: 20px;
  }
    
    h1.section-heading {
      text-align: center;
      @media only screen and (max-width: 500px) {
          font-size: 25px;
      }
      span{
        color: rgb(254, 148, 0);
      }
    }
    
    .slick-dots {
        bottom: 20px;
        text-align: right;
    }
    
      .slick-dots li button:nth-child(2) {
        color: red;
      }
   
      .slick-dots li button:before {
        content: "" !important;
        font-size: 0;
        display: block;
        width: 20px;
        height: 4px;
        cursor: pointer;
        color: transparent;
        border: 0;
        outline: none;
        background: black;
    }

`;

const FoodReviewsScreen = (): ReactElement => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
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
        ]
    };


    return (
        <Fragment>
            <div className={__css_reviews_section}>
                <div className={CommonStyleSheet.classes.container}>
                    <h1 className={"section-heading"}><span>What Our</span> Food Lover said</h1>
                    <Slider {...settings}>
                        <div>
                            <FoodReviewCardScreen
                                src={ReviewerImage1}
                                name={"Sufiya Alam"}
                                sub_title={"Food Hunter"}
                                review_comment={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet eos, magni quis rem tenetur ut voluptatibus."}
                            />
                        </div>

                        <div>
                            <FoodReviewCardScreen
                                src={ReviewerImage2}
                                name={"Sufiya Alam"}
                                sub_title={"Food Hunter"}
                                review_comment={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet eos, magni quis rem tenetur ut voluptatibus."}
                            />
                        </div>

                        <div>
                            <FoodReviewCardScreen
                                src={ReviewerImage2}
                                name={"Sufiya Alam"}
                                sub_title={"Food Hunter"}
                                review_comment={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet eos, magni quis rem tenetur ut voluptatibus."}
                            />
                        </div>
                    </Slider>
                </div>
            </div>
        </Fragment>
    );
};

export { FoodReviewsScreen };
