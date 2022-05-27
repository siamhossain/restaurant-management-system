import {css} from "@emotion/css";

export const ContactCardStyleSheet = {
    classes: {
        root: css`
          .card-container {
            padding: 20px;
            background-color: #fff;
            box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
            text-align: center;
            height: 200px;
            cursor: pointer;
            
            :hover {
              .contact-icon {
                box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
                transition: 0.5s;
              }
            }
            
            .contact-icon {
              background: #f9f9f9;
              height: 75px;
              border-radius: 50px;
              width: 75px;
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              left: 0;
              right: 0;
              margin: auto;
            }
            .card-info {
              margin-top: 10px;
              
              .card-contact-name {
                font-size: 18px;
                color: rgb(0, 0, 0);
                font-weight: bold;
                text-transform: uppercase;
                @media only screen and (max-width:900px){
                  font-size: 14px;
                }
                @media only screen and (max-width:300px){
                  font-size: 14px;
                }
              }
            }
              .address {
                margin-top: 0px;
                font-size: 14px;
                color: rgb(146, 146, 146);
                @media only screen and (max-width:900px){
                  font-size: 12px;
                }
                @media only screen and (max-width:300px){
                  font-size: 12px;
                }
                
              }
            
            
          }
          

        `,
    },
    styles: {

    },
};