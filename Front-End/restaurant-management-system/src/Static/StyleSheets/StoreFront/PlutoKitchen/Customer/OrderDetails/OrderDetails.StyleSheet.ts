import {css} from "@emotion/css";

export const OrderDetailsStyleSheet = {
    classes: {
        root: css`
            padding-left: 50px;
            @media only screen and (max-width: 900px) {
              padding-left: 0;
            }
            span {
              color: #ff8b3c;
              font-size: 14px;
            }
            h1 {
              color: #ff8b3c;
              font-size: 30px;
            }
            
            th {
              font-size: 16px;
              color: rgb(62, 62, 62);
              font-weight: bold;
            }
            td {
              font-size: 14px;
              color: rgb(62, 62, 62);
            }
            
            .billing-address {
              h1 {
                border-bottom: 1px solid #e5e5e5;
                padding-bottom: 10px;
              }
              margin-top: 70px;
              p.address {
                  font-size: 14px;
                  color: rgb(95, 95, 95);
              }
            }
        `,
    },
    styles: {

    },
};