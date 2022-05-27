import {css} from "@emotion/css";

export const ProductDescriptionTabStyleSheet = {
    classes: {
        root: css`
            margin-top: 40px;
            
            .MuiTab-root {
              background: #ededed;
              border-radius: 5px;
              margin-right: 15px;
              font-weight: bold;
              text-transform: capitalize;
              opacity: 1;
              @media only screen and (max-width: 600px) {
                padding: 6px 6px;
                min-height: 0;
                min-width: 60px !important;
              }
            }
            .MuiTab-textColorInherit.Mui-selected {
                background: #ffc107;
            }
            .PrivateTabIndicator-colorSecondary-7 {
              display: none;
            }
            .MuiTabPanel-root {
                padding: 35px;
            }
            .tab-panel-container {
              border: 1px solid #e3e3e3;
              border-radius: 5px;
              margin-top: 10px;
              font-size: 14px;
              color: rgb(75, 75, 75);
            }
        `,
    },
    styles: {

    },
};