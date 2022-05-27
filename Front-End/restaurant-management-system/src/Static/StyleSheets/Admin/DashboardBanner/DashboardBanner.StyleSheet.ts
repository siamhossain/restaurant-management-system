import {css} from "@emotion/css";

export const DashboardBannerStyleSheet = {
    classes: {
        root: css`
            .main {
                  &-blogs {
                    display: flex;
                    align-items: center;
                  }
                  
                  
                  &-blog__title {
                    font-size: 23px;
                    max-width: 12ch;
                    font-weight: 600;
                    letter-spacing: 1px;
                    color: #fff;
                    margin-bottom: 20px;
                  }
                  &-blog {
                    background-size: cover !important;
                    background-position: center !important;
                    //height: 350px;
                    padding: 30px;  
                    border-radius: 20px;
                    position: relative;
                    transition: background 0.3s;
                    background-repeat: no-repeat !important;
                  }
                  
                  
            }
            
            .resource-counter-section {
               box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
               background: #ffffff;
               //background-position-x: 0;
               background-size: 139%;
               filter: saturate(1.4);
               padding: 30px !important;
               border-radius: 20px;
               .author-img {
                 border-color: rgb(255 255 255 / 75%);
                 margin-top: 14px;
               }
               .author-img__wrapper svg {
                 border-color: #ffe6b2;
                 color: #e7bb7d;
               }
               .author-detail {
                 margin-left: 0;
               }
            }
        `,
    },
    styles: {

    },
};