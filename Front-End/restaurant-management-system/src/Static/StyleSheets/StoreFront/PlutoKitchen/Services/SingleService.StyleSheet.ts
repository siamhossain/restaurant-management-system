import {css} from "@emotion/css";

export const SingleServiceStyleSheet = {
    classes: {
        root: css`
            .service-wrapper {
              text-align: center;
              .service-logo {
                background: #fe9400;
                width: 150px;
                height: 150px;
                border-radius: 50%;
                margin-bottom: 25px;
                display: inline-block;
                
                @media only screen and (max-width: 900px) {
                  width: 100px;
                  height: 100px;
                }
                
                position: relative;
                img {
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  right: 0;
                  left: 0;
                  margin: auto;
                }
              }
              
              .single-service-info {
                h4 {
                  font-size: 21px;
                  color: rgb(1, 1, 1);
                  font-weight: bold;
                  margin: 0;
                  margin-bottom: 10px;
                }
                p {
                  font-size: 14px;
                  color: rgba(1, 1, 1, 0.8);
                  margin: 0;
                  //text-align: center;
                }
              }
            }
        `,
    },
    styles: {

    },
};
