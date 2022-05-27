import {css} from "@emotion/css";

export const MagnifyStyleSheet = {
    classes: {
        root: css`
          //background: #f4f4f4;
          //height: 690px;
          //text-align: center;
          .container {
            .main-image-wrapper {
              position: relative;
              z-index: 1000;
              box-sizing: border-box;
              background-position: center center !important;
              background-size: cover !important;
              background-repeat: no-repeat !important;
              cursor: zoom-in;
              width: 100%;
              @media only screen and (max-width: 600px){
                height: 350px !important;
              }
              @media only screen and (max-width: 350px){
                height: 250px !important;
              }
              
              :hover {
                .zoom-clone-image-wrapper {
                  display: block;
                }
              }
            }
            
            .zoom-clone-image-wrapper {
              display: none;
              position: absolute;
              z-index: 9999;
              top: -1px;
              bottom: 0;
              left: 101%;
              cursor: default;
              background-repeat: no-repeat !important;
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
              border-radius: 10px !important;
              
              :hover {
                display: none !important;
              }
            }
            
            //.smallProductView{
            //  display: flex;
            //  justify-content: center;
            //  align-items: center;
            //  margin-top: 13px;
              
            //}
          }
        `,
    },
    styles: {

    },
};