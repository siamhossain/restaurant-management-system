import {css} from "@emotion/css";

export const ServicesStyleSheet = {
    classes: {
        root: css`
          margin-bottom: 100px;
          @media only screen and (max-width: 1050px) {
            margin-bottom: 50px;
          }
          
            .section-heading {
                text-align: center;
              @media only screen and (max-width: 500px) {
                font-size: 25px;
              }
                span {
                    color: #fe9400;
                }
            }
            .services-grid-wrapper {
              background: #fff;
              padding: 40px 100px;
              box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
              
              @media only screen and (max-width: 600px) {
                padding: 15px 30px;
              }
            }
        `,
    },
    styles: {

    },
};
