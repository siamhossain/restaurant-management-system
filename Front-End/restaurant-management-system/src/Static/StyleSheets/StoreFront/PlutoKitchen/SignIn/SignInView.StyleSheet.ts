import {css} from "@emotion/css";
import SignInImage from "@/Static/Images/StoreFront/PlutoKitchen/SignIn/signin-image.png";

export const SignInViewStyleSheet = {
    classes: {
        root: css`
          table.sign-in-table {
            width: 100%;
            height: 100vh;
            
            td.sign-in-left-section {
              width: 50%;
              text-align: right;
              position: relative !important;
              
              .sign-in-content {
                display: inline-block;
                text-align: left!important;
                overflow: auto !important;
                position: absolute;
                top: 0;
                bottom: 0;
                right: 150px;
                
                @media only screen and (max-width: 1200px) {
                    right: 50px;
                }
                
                @media only screen and (max-width: 1024px) {
                    right: 30px;
                }
                
                @media only screen and (max-width: 900px) {
                    padding: 0 25px;
                    left: 0;
                    right: 0;
                }
                @media only screen and (max-width: 600px) {
                    padding: 0 10px;
                    
                }
              }
              .sign-in-content::-webkit-scrollbar {
                    display: none;
              }
              .sign-in-content {
                  -ms-overflow-style: none;  /* IE and Edge */
                  scrollbar-width: none;  /* Firefox */
              }
            }
                
            td.sign-in-right-section {
              width: 50%;
              position: relative;
              @media only screen and (max-width: 900px) {
                display: none;
              }
              .sign-in-img {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
              }
            }
          }
        `,
    },
    styles: {

    },
};