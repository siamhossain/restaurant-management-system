import {css} from "@emotion/css";

export const ResourceCounterStyleSheet = {
    classes: {
        root: css`
          .wrapper {
            text-align: center;
            padding: 10px;
            box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
            background: #fff;
            border-radius: 8px;
            .icon {
              display: inline-block;
              height: 60px;
              position: relative;
              img {
                width: 35px;
                height: 35px;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
              }
            }

            p {
              margin: 0;
              margin-top: 5px;
              color: #ff7551;
              font-weight: bold;
            }
            .counter {
              font-weight: 500;
              //margin-top: 10px;
              h2 {
                margin: 0;
                color: #60a7ff;
                font-size: 20px;
              }
            }
          }
        `,
    },
    styles: {

    },
};