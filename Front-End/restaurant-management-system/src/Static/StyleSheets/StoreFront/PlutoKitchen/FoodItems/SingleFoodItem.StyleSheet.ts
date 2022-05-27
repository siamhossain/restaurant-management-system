import {css} from "@emotion/css";

export const SingleFoodItemStyleSheet = {
    classes: {
        root: css`
          .food-item-wrapper {
            text-align: center;
            
            .food-item-img {
              background-color: #f2f1f2;
              width: 150px;
              height: 150px;
              border-radius: 50%;
              display: inline-block;
              cursor: pointer;
              
              :hover {
                box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
                transition: 0.5s;
              }
              
              @media only screen and (max-width: 600px) {
                width: 140px;
                height: 140px;
              }
              
              position: relative;
            }
            
            img {
              position: absolute;
              top: 0;
              bottom: 0;
              right: 0;
              left: 0;
              margin: auto;
            }
            
            .single-food-item-name {
              p{
                font-size: 14px;
                color: rgb(0, 0, 0);
                font-weight: bold;
              }
            }
            
          }
          
        `,
    },
    styles: {

    },
};