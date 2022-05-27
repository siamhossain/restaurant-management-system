import {css} from "@emotion/css";

export const AddressStyleSheet = {
    classes: {
        root: css`
          background-color: #fffbf7;
          padding-left: 10px;
          padding-right: 0;
          @media only screen and (max-width: 1000px) {
            padding: 20px;
          }

          @media only screen and (max-width: 600px) {
            padding: 0 3px;
          }


         .address-section {
           background-color: #fff;
           padding: 80px;

           @media only screen and (max-width: 1000px) {
             padding: 0 20px;
           }

           @media only screen and (max-width: 500px) {
             padding: 0 15px;
           }
          .address-following {
            p {
              font-size: 14px;
              @media only screen and (max-width: 500px) {
                font-size: 12px;
              }
            }
            
            .address-title {
              color: #fe9308 !important;
              font-size: 21px;
              font-weight: bold;
              display: inline-block;
              @media only screen and (max-width: 900px) {
                font-size: 17px;
              }
              @media only screen and (max-width: 500px) {
                font-size: 15px;
              }
            }

            .add-button {
              display: inline-block;
              margin-left: 45px;
              @media only screen and (max-width: 1000px) {
                margin-left: 20px;
              }
           
              button {
                background-color: #ffc222;
                padding: 8px 20px;
                font-weight: bold;
                font-size: 14px;
                color: rgb(0, 0, 0);
                cursor: pointer;
                @media only screen and (max-width: 500px) {
                  padding: 5px 10px;
                  font-size: 12px;

                }
               
              }
            }
           
              .address-wrapper {
                display: flex;
                justify-content: space-between;

                @media only screen and (max-width: 1450px) {
                  flex-direction: column;
                  //margin-left: 80px;
                }
                
                .billing-address {
                  
                }
                
                .shipping-address {
                  
                 
                }
              }
            
            .billing-address-from {
              .first-name {
                font-size: 14px;
                color: rgb(92, 92, 92);
                height: 40px;
                @media only screen and (max-width: 1000px) {
                  height: 35px;
                }
                
              }
              
              .button {
                button {
                  background-color: #ffc222;
                  padding: 15px 30px;
                  font-size: 14px;
                  font-weight: bold;
                  float: right;
                  cursor: pointer;
                  @media only screen and (max-width: 500px) {
                     padding: 10px;
                    font-size: 12px;
                  }
                }
              }
            }
              
             
            }

         }
        `,
    },
    styles: {

    },
};