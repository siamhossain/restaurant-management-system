import {css} from "@emotion/css";
import CityImage from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/Get in touch/City.png";

export const ContactStyleSheet = {
    classes: {
        root: css`
           .contact-container {
              width: 833px;
              box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
              display: inline-block;
              position: relative;
              
              @media only screen and (max-width: 1024px) {
                width: 100% !important;
              }
              .wrapper {
                  
              }
              
              .contact-img {
                background: black;
                height: 303px;
                position: relative;
                border-radius: 5px;
                @media only screen and (max-width: 960px) {
                  height: 220px;
                  display: none;
                }
                img {
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  margin: auto;
                }
              }
              .contact-info-bg {
                background: url(${CityImage});
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                height: 303px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                
                @media only screen and (max-width: 900px) {
                  height: 220px;
                }
                
                .contact-info {
                  p {
                   margin: 0;
                   text-transform: uppercase;
                   font-weight: bold;
                  }
                  h1.moto {
                    font-size: 40px;
                    text-transform: uppercase;
                    margin: 0;
                    @media only screen and (max-width: 900px) {
                      font-size: 20px;
                    }
                    
                  }
                  span.address {
                    display: block;
                    color: #000000;
                    font-size: 17px;
                  }
                  button.direction-btn {
                    background-color: rgb(0, 0, 0);
                    width: 164px;
                    height: 47px;
                    color: #fff;
                    margin-top: 20px;
                  }
                }
                
              }
           }
        `,
    },
    styles: {

    },
};