import {css} from "@emotion/css";

export const FoodBlogCardStyleSheet = {
    classes: {
        root: css`
          .card-container {
            border: 1px solid #efefef;
            height: 481px;
            cursor: pointer;
            
            :hover {
              box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
              transition: 0.4s;
            }
            
            .card-bg {
              height: 228px;
              background-size: cover !important;
              background-repeat: no-repeat !important;
              background-position: center !important;
              border-radius: 5px;
              
              @media only screen and (max-width: 900px) {
                height: 190px;
              }
            }
            .card-info {
              padding: 20px;
              .date-and-postBy {
                font-size: 12px;
                color: rgba(0, 0, 0, 0.6);
                padding-bottom: 10px;
              }
              .blog-name {
                font-size: 18px;
                color: rgb(1, 1, 1);
                font-weight: bold;
                margin-bottom: 15px;
              }
              p.description {
                font-size: 14px;
                color: rgb(109, 109, 109);
                margin: 0;
                margin-bottom: 15px;
              }
              button.read-more {
                background: #ffc222;
                padding: 15px 40px;
                font-size: 14px;
                color: rgb(0, 0, 0);
                font-weight: bold;
                cursor: pointer;
                
                outline: 1px solid;
                 outline-color: rgb(255, 194, 34, 1);
                 outline-offset: 0px;
                 transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
                 :hover {
                  outline-color: rgba(0, 0, 0, 0);
                  outline-offset: 15px;
                  background-color: #ffa62b;
                  color: #fff;
                 }
                
                @media only screen and (max-width: 900px) {
                  padding: 10px 25px;
                }
              }
            }
          }
        `,
    },
    styles: {

    },
};