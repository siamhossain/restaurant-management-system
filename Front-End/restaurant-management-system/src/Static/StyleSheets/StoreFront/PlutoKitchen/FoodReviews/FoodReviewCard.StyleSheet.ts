import {css} from "@emotion/css";

export const FoodReviewCardStyleSheet = {
    classes: {
        root: css`+
          margin-top: 70px;
          margin-bottom: 70px;
          
          .review-card-container {
            margin: 10px;
            background: #fff;
            box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
            display: flex;
            
            .review-card-img {
              padding-left: 20px;
              img {
                @media only screen and (max-width: 500px) {
                  display: none;
                }
              }
            }
            .review-card-info {
              padding: 30px 10px 10px 20px;
              text-align: left;
              
              h3.reviewer-name {
                font-size: 21px;
                margin: 0;
              }
              p.sub-title {
                font-size: 14px;
                color: rgb(109, 109, 109);
                font-weight: bold;
                
                margin: 0;
              }
              p.review-comment {
                font-size: 14px;
                color: rgb(109, 109, 109);
                margin: 0;
                margin-top: 20px;
              }
            }
          }
        `,
    },
    styles: {

    },
};