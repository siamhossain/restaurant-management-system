import {css} from "@emotion/css";

export const ExperienceInfoStyleSheet = {
    classes: {
        root: css`
            .content-wrapper {
              h1.title {
                font-size: 40px;
                color: rgb(1, 1, 1);
                @media only screen and (max-width: 900px) {
                  font-size: 25px;
                }
              }
              p.details {
                  font-size: 14px;
                  color: rgb(112, 112, 112);
              }
              button {
                background: #ffd203;
                font-weight: 800;
                padding: 15px 30px;
                cursor: pointer;
                
                outline: 1px solid;
                 outline-color: #ffd203;
                 outline-offset: 0px;
                 transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
                 :hover {
                  outline-color: rgba(0, 0, 0, 0);
                  outline-offset: 15px;
                  background-color: #fcd723;
                  color: black;
                 }
                
                @media only screen and (max-width: 900px) {
                  padding: 10px 20px;
                }
              }
            }
        `,
    },
    styles: {

    },
};