import {css} from "@emotion/css";


export const ElementorElementStyleSheet = {
    classes: {
        root: css`
           .elementor-container {
              //height: 400px;
              text-align: center;
              .elementor-widget-wrap {
                  margin-bottom: 25px;
                  .counter-icon {
                    border: 1px solid #535353;
                    display: inline-block;
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    position: relative;
                    margin-bottom: 25px;
                    img {
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                    }
                  }
                  .counter-title {
                    p {
                        font-size: 18px;
                        color: rgb(255, 255, 255);
                        margin: 0;
                    }
                  }
                  .counter {
                    font-size: 20px;
                    color: rgb(255, 210, 3);
                    font-weight: bold;
                  }
              }
           }                     
        `,
    },
    styles: {

    },
};