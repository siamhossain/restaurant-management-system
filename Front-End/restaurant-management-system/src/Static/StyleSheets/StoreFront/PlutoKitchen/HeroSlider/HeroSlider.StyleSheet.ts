import {css} from "@emotion/css";
import BannerImage from "@/Static/Images/StoreFront/PlutoKitchen/Banner/Banner-image.png";

export const HeroSliderStyleSheet = {
    classes: {
        container:css`
            .slick-initialized { overflow: hidden !important; }
        `,
        root: css`

            .hero-bg {
                
                background-position: center center;
                background-size: cover;
                background-repeat: no-repeat;
                height: 800px;
                display: flex;
                align-items: center;
                
                @media only screen and (max-width: 900px) {
                  height: 500px;
                }
            }
            .content-wrapper {
              //display: inline-block !important;
              //text-align: left;
              //position: relative;
              //top: 50%;
              //transform: translateY(-50%);
              
              
              
              .content-title {
                h1{
                  font-size: 56px;
                  color: #fff;
                  margin: 0;
                  line-height: 1.2;
                  span {
                    color: #fe9400; 
                  }
                  @media only screen and (max-width: 900px) {
                    font-size: 24px;
                  }
                }
              }
              
              p {
                font-size: 14px;
                color: rgb(202, 202, 202);
              }
              
              .slider-content-button {
                   button{
                     font-size: 16px;
                     background-color: #fe9400;
                     margin-top: 30px;
                     color: #ffff;
                     height: 50px;
                     width: 160px;
                     font-weight: bold;
                     cursor: pointer;
                     
                     outline: 1px solid;
                     outline-color: rgba(255, 255, 255, .5);
                     outline-offset: 0px;
                     transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
                     :hover {
                      outline-color: rgba(255, 255, 255, 0);
                      outline-offset: 15px;
                      background-color: #ffa62b;
                      color: black;
                     }
                     
                     @media only screen and (max-width: 900px) {
                        height: 40px;
                        width: 130px;
                     }
                   }
              }
            }
            
            .banner_img  {
              img {
                width: 70%;
              }
            }
        `,
    },
    styles: {

    },
};