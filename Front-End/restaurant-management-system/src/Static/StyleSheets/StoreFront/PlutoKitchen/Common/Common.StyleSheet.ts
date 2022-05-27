import {css} from "@emotion/css";

export const CommonStyleSheet = {
    classes: {
        root: css`
            /**
             * Write down your styles here
             */
        `,
        container: css`
            padding: 0 300px;
            //position: relative;
            
            @media only screen and (max-width: 1700px) {
              padding: 0 270px;
            }
            
            @media only screen and (max-width: 1500px) {
              padding: 0 230px;
            }
            
            @media only screen and (max-width: 1350px) {
              padding: 0 200px;
            }
            
            @media only screen and (max-width: 1280px) {
              padding: 0 160px;
            }
            
            @media only screen and (max-width: 1200px) {
              padding: 0 140px;
            }
            
            @media only screen and (max-width: 1100px) {
              padding: 0 100px;
            }
            
            @media only screen and (max-width: 900px) {
              padding: 0 20px;
            }
            
            @media only screen and (max-width: 250px) {
              padding: 0 10px;
            }
        `,
    },
    styles: {

    },
};