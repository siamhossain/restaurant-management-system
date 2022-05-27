import {css} from "@emotion/css";

export const CartStyleSheet = {
    classes: {
        root: css`
            background: #faf7f2;
            padding: 70px 0;
            .cart-container {
              background: #fff;
              height: 624px;
              padding: 35px 15px 0 60px;
              
              @media only screen and (max-width: 1200px) {
                padding: 10px;
                height: auto;
              }
              
              .cart-table {
                overflow-x: auto;
                table {
                   width: 100%;
                   tr {
                      td:nth-child(1) {
                        @media only screen and (max-width: 600px) {
                            width: 250px;
                        }
                      }
                      th {
                          background: #f7f7f7;
                          text-align: center;
                          @media only screen and (max-width: 1200px) {
                            font-size: 12px;
                          }
                          @media only screen and (max-width: 600px) {
                            //font-size: 10px;
                          }
                      }
                      td.cart-table-input {
                        @media only screen and (max-width: 600px) {
                            width: 250px !important;
                        }
                      }
                      td {
                          text-align: center;
                         // border-bottom: 1px solid #d7d7d7;
                          font-size: 14px;
                          color: rgb(106, 106, 106);
                          font-weight: bold;
                          @media only screen and (max-width: 1200px) {
                            font-size: 12px;
                          }
                          @media only screen and (max-width: 600px) {
                            //font-size: 10px;
                          }
                          .cross-icon-btn {
                            background: #f7f7f7 !important;
                            color: #6a6a6a;
                            margin-right: 35px;
                            min-width: 20px !important;
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            @media only screen and (max-width: 600px) {
                              width: 20px;
                              height: 20px;
                              margin-right: 15px;
                            }
                          }
                          img {
                            width: 50px;
                            height: 50px;
                            margin-right: 25px;
                            @media only screen and (max-width: 600px) {
                              width: 25px;
                              height: 25px;
                              margin-right: 15px;
                            }
                          }
                          input {
                            width: 60px;
                            @media only screen and (max-width: 600px) {
                              height: 25px;
                            }
                          }
                          .input-btns {
                            position: relative;
                            display: inline-block;
                          }
                          .quantity-action-btns {
                                position: absolute;
                                right: 2px;
                                top: 5px;
                                @media only screen and (max-width: 600px) {
                                  top: 2px;
                                }
                                svg {
                                   width: 14px;
                                   height: 14px;
                                   :last-child {
                                      margin-top: -3px;
                                      @media only screen and (max-width: 600px) {
                                        margin-top: -5px;
                                      }
                                   }
                                }
                          }
                      }
                      th, td {
                        padding: 10px 0;
                        @media only screen and (max-width: 600px) {
                          padding: 15px 0;
                        }
                      }
                   }
                }
              }
              
              .cart-action-buttons {
                  margin-top: 110px;
                  @media only screen and (max-width: 900px) {
                      margin-top: 40px;
                  }
                  button {
                    height: 40px;
                    font-size: 14px;
                    color: rgb(0, 0, 0);
                    font-weight: bold;
                    margin-bottom: 5px;
                    :focus {
                      background: #ffd203;
                    }
                    @media only screen and (max-width: 900px) {
                      height: 30px;
                      font-size: 10px;
                    }
                  }
                  button.updateCart-btn {
                    background: #f7f7f7;
                    float: right;
                    height: 40px;
                    @media only screen and (max-width: 900px) {
                      height: 30px;
                      font-size: 10px;
                      float: none;
                    }
                  }
                }
              .cart-total-container {
                background: #f7f7f7;
                height: 364px;
                h3.cart-total-heading {
                  margin: 0;
                  font-size: 23px;
                  color: rgb(255, 120, 0);
                  padding: 5px 15px;
                }
                table {
                   width: 100%;
                   margin-top: 40px;
                   tr {
                      td {
                        border-bottom: 1px solid #d7d7d7;
                        font-size: 14px;
                        color: rgb(0, 0, 0);
                        font-weight: bold;
                      }
                      th, td {
                        text-align: left;
                        padding: 10px 25px;
                      }
                   }
                }
                .proceed-btn {
                  margin-top: 40px;
                  text-align: center;
                  button {
                    background: #ffd203;
                    font-size: 14px;
                    color: rgb(0, 0, 0);
                    font-weight: bold;
                    height: 40px;
                  }
                }
              }
               
            }
        `,
    },
    styles: {

    },
};