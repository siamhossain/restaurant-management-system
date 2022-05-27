import {css} from "@emotion/css";

export const BookTableStyleSheet = {
    classes: {
        root: css`
            margin-top: 50px;
            margin-bottom: 50px;
            text-align: center;
          .row {
            padding: 40px 30px;
            margin-bottom: 70px;
          }
          
          .ub-mb_24px {
            margin-bottom: 8px;
          }
          
          label {
            text-align: left;
          }
          
          .bookTable-container {
            width: 700px;
            display: inline-block;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            background: #fff;
            
            @media only screen and (max-width: 900px) {
              width: 100%;
            }

            .bookTable-title {
              h1{
                font-size: 30px;
                span{
                  color: #fe9400;
                }
              }
            }
            
            .button button {
              float: right;
              padding: 15px 35px;
              font-size: 15px;
              color: rgb(0, 0, 0);
              font-weight: bold;
              background-color: #fe9400;
              cursor: pointer;
              margin-top: 35px;
              
              outline: 1px solid;
                 outline-color: rgb(254, 148, 0, 1);
                 outline-offset: 0px;
                 transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
                 :hover {
                  outline-color: rgba(0, 0, 0, 0);
                  outline-offset: 15px;
                  background-color: #ffa62b;
                  color: #fff;
                 }
            }
          }
        `,
    },
    styles: {

    },
};