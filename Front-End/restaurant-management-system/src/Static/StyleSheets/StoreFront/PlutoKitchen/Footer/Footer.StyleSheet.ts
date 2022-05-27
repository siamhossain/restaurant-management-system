import {css} from "@emotion/css";

export const FooterStyleSheet = {
    classes: {
        root: css`
          background-color: #141414;
          //margin-top: 150px;
          text-align: center;
          overflow-x: clip;
          
          .footer-container {
            text-align: left;
            .logo {
              color: #fff;
            }

            .footer-heading {
              color: #fe9400;
              font-size: 21px;
            }

            .footer-about {
              p{
                margin: 0;
                margin-bottom: 20px;
                font-size: 14px;
                color: rgb(229, 229, 229);
              }
              
              @media only screen and (max-width: 900px) {
                 padding: 15px;
                p{
                  margin-bottom: 10px;
                  font-size: 13px;
                }
              }
            }

            .newsletter {
              h3{
                margin: 0;
                color: #fff;
                font-size: 20px;
              }
              p{
                margin-top: 0;
                margin-bottom: 20px;
                color: rgb(229, 229, 229);
                font-size: 14px;
              }
            }

            .social-media {

              .social-icon {
                margin-bottom: 20px;

                a {
                  color: #fff;
                  font-size: 15px;
                  :hover {
                    margin-left: 8px;
                    transition: 0.3s;
                    color: #b5b5b5;
                  }
                }
                img {
                  margin-right: 17px;
                }
              }
              @media only screen and (max-width:900px) {
                padding: 15px;
                .social-icon {
                  margin-bottom: 5px;
                  a {
                    font-size: 13px;
                  }
                }
              }
              

            }
            .contact-info {
              h4{
                font-size: 14px;
                margin-bottom: 0px;
                font-family: "Myriad Pro";
                color: rgb(145, 145, 145);
              }
              p{
                color: #fff;
                font-size: 15px;
                margin: 0;
              }
              @media only screen and (max-width:900px) {
                padding: 15px;
                p{
                  font-size: 13px;
                }
              }

            }

            .opening-hours{
              p{
                color: #fff;
                font-size: 14px;
              }
              @media only screen and (max-width:900px) {
                padding: 15px;
                p{
                  font-size: 13px;
                }
              }
            }

            .newsletter-input {
              .newsletter-input-table {
                td {
                  .ub-mb_24px {
                    margin-bottom: 8px;
                  }
                }
                input {
                  height: 40px;
                  border-radius: 0;
                  border: none;
                  :focus {
                    box-shadow: none !important;
                  }
                }
                button {
                  height: 40px;
                  border: none;
                  background: #fe9400;
                  padding: 0px 15px;
                  font-weight: bold;
                  color: #fff;
                }
              }
            }
          }
        `,
    },
    styles: {

    },
};