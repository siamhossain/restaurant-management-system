import {css} from "@emotion/css";

export const AccountDetailsStyleSheet = {
    classes: {
        root: css`
                
          background-color: #fffbf7;
          margin-bottom: 30px;
            
           .account-details-section {
             background-color: #fff;
             padding: 80px 30px;
             @media only screen and (max-width: 1000px) {
               padding: 30px;
             }
             
             .account-details-from {
             
               .first-name {
                 font-size: 14px;
                 color: rgb(92, 92, 92);
                 height: 40px;
                 @media only screen and (max-width: 500px) {
                   height: 35px;
                 }
               }
             }
             
             .password-change-section {
               //display: inline-block;
               h1 {
                 color: #ff9601;
                 font-size: 21px;
                 @media only screen and (max-width: 500px) {
                   font-size: 16px;
                 }
               }
               .password-change-from {
                 //display: inline-block;
                 
                 .password {
                   font-size: 14px;
                   color: rgb(92, 92, 92);
                   height: 40px;
                   @media only screen and (max-width: 500px) {
                     height: 35px;
                   }
                 }
               }
               .button {
                 button {
                   background-color: #ffc222;
                   padding: 15px 30px;
                   font-size: 14px;
                   font-weight: bold;
                   float: right;
                   cursor: pointer;
                   @media only screen and (max-width: 500px) {
                     padding: 10px;
                     font-size: 12px;
                   }
                 }
               }
             }
             
             
           }
          
          
        `,
    },
    styles: {

    },
};