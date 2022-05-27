import {css} from "@emotion/css";

export const AboutUsStyleSheet = {
    classes: {
        root: css`
          margin-top: 100px;
          @media only screen and (max-width: 900px) {
            margin-top: 50px;
          }

          @media only screen and (max-width: 300px) {
            margin-top: 30px;
          }
          .about-us-info {
                padding: 25px;
                h3 {
                    font-size: 21px;
                    color: rgb(254, 148, 0);
                    margin: 0;
                }
                h2 {
                    font-size: 30px;
                    margin: 0;
                  @media only screen and (max-width: 900px) {
                    font-size: 25px;
                  }
                  //@media only screen and (max-width: 600px) {
                  //   font-size: 20px;
                  //}
                }
           
              .about_details {
                p{
                  font-size: 14px;
                  color: rgb(116, 116, 116);
                }
              }
          
              button {
                font-size: 16px;
                background-color: #fe9400;
                padding: 15px 40px;
                margin-top: 25px;
                color: #ffff;
                cursor: pointer;
                font-weight: bold;
                
                outline: 1px solid;
                 outline-color: rgb(254, 148, 0, 1);
                 outline-offset: 0px;
                 transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
                 :hover {
                  outline-color: rgba(0, 0, 0, 0);
                  outline-offset: 15px;
                  background-color: #ffa62b;
                  color: black;
                 }
              }
          }
        `,
    },
    styles: {

    },
};