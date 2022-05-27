import {css} from "@emotion/css";

export const FoodItemsStyleSheet = {
    classes: {
        root: css`
            padding-top: 100px;
            padding-bottom: 100px;
            
          @media only screen and (max-width: 600px){
            padding-top: 70px;
            padding-bottom: 50px;
          }

          @media only screen and (max-width: 400px){
            padding-top: 50px;
            padding-bottom: 30px;
          }
        `,
    },
    styles: {

    },
};