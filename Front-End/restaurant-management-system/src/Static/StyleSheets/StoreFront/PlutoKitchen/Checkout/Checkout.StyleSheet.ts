import {css} from "@emotion/css";

export const CheckoutStyleSheet = {
    classes: {
        root: css`
                background-color: #fffbf7;
          
          @media only screen and (max-width: 950px) {
            padding: 0 40px;
          }

          @media only screen and (max-width: 500px) {
            padding: 0 0;
          }
            .checkout-section {
              background-color: #fff;
              padding: 10px 50px;
              padding-bottom: 200px;
              @media only screen and (max-width: 950px) {
                padding: 10px 30px;
              }
              @media only screen and (max-width: 300px) {
                padding: 10px 10px;
              }
              .coupon-code {
                background-color: #ffc222;
                padding: 10px;
                font-size: 16px;
                span {
                  color: #fff;
                  cursor: pointer;
                }
                @media only screen and (max-width: 500px) {
                  font-size: 13px;
                }
              }
              
              h1 {
                font-size: 16px;
                color: rgb(255, 120, 0);
                margin-top: 30px;
                @media only screen and (max-width: 300px) {
                  font-size: 12px;
                }
              }
              .first-name {
                font-size: 14px;
                color: rgb(92, 92, 92);
                height: 45px;
              }

              .order-notice {
                height: 120px;
              }

              h1.your-order {
                margin-bottom: 40px;
                @media only screen and (max-width: 300px) {
                  margin-bottom: 20px;
                }
              }
              .your-order-section {
                background-color: #f7f7f7;
                @media only screen and (max-width: 300px) {
                  padding: 0 10px;
                }
               
                 ul.your-order-list {
                  padding: 10px;
                      li {
                        margin-bottom: 20px;
                        list-style-type: none;
                        font-size: 14px;
                        font-weight: bold;
                        border-bottom: 1px solid #d7d7d7;
                        @media only screen and (max-width: 300px) {
                          font-size: 11px;
                        }
                        
                        span {
                          float: right;
                        }
                      }
                }

                .payment-section {
                  padding: 50px 15px;
                  .payment-method {
                    background-color: #fff;
                    padding: 25px 10px;
                  }
                }
                
                
                .order-bottom {
                  padding: 30px 30px;
                  font-size: 13px;
                  color: rgb(76, 76, 76);
                  @media only screen and (max-width: 300px) {
                    padding: 30px 10px;
                  }
                }
                
                .button {
                  text-align: center;
                  padding-bottom: 60px;
                    button {
                      background-color: #ffc222;
                      padding: 15px 120px;
                      font-size: 14px;
                      color: rgb(0, 0, 0);
                      @media only screen and (max-width: 450px) {
                        padding: 10px 80px;
                      }
                      @media only screen and (max-width: 300px) {
                        padding: 10px 40px;
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