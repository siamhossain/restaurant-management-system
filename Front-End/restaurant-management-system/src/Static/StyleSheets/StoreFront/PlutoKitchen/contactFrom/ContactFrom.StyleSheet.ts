import {css} from "@emotion/css";

export const ContactFromStyleSheet = {
    classes: {
        root: css`
          .from-section {
            box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
            padding: 40px;
            margin-top: 40px;
            @media only screen and (max-width: 600px) {
              padding: 15px;
              margin-top: 20px;
            }
            .from-container {
              .your-name {
                height: 45px;
                //background-color: #f9f9f9;
              }
              .your-message {
                height: 100px;
                //background-color: #f9f9f9;
              }
              
              .button {
                text-align: right;
                //padding: 10px;
                margin-top: 45px;
                button {
                  background-color: #f5ba21;
                  padding: 14px 40px;
                  cursor: pointer;
                  font-size: 14px;
                  color: rgb(0, 0, 0);
                  font-weight: bold;
                  text-transform: uppercase;
                  
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
                 
                  @media only screen and (max-width: 600px) {
                    padding: 10px 15px !important;
                  }
                }

                @media only screen and (max-width:300px){
                  
                    padding: 0px;
                    button {
                      padding: 14px 20px;
                    }
              }
            }
          }
        `,
    },
    styles: {

    },
};