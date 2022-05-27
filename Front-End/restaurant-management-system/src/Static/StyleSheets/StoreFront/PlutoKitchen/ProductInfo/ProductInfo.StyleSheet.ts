import {css} from "@emotion/css";

export const ProductInfoStyleSheet = {
    classes: {
        root: css`
            .product-info-container {
               padding-top: 15px;
               h1.product-name {
                    font-size: 40px;
                    color: #000;
                    margin: 0;
                    @media only screen and (max-width: 600px) {
                      font-size: 25px;
                    }
               }
               p.product-quality {
                    font-size: 14px;
                    color: rgb(162, 162, 162);
                    margin: 0;
               }
               h3.product-price {
                    font-size: 25px;
                    color: rgb(212, 15, 0);
                    margin: 0;
                    margin-top: 15px;
                    margin-bottom: 15px;
               }
               .actions {
                  border: 1px solid #bfbfbf;
                  border-radius: 10px;
                  padding: 7px 15px;
                  display: inline-block;
                  .quantity {
                    display: inline-block;
                    span {
                      font-weight: 800;
                      font-size: 15px;
                    }
                    button {
                      background: #fff3cd;
                      font-weight: bold;
                    }
                  }
                  .fav_icon {
                    display: inline-block;
                    margin-left: 50px;
                    @media only screen and (max-width: 600px) {
                      margin-left: 0;
                    }
                    svg {
                      background: #ffc107; 
                      border-radius: 5px;
                      padding: 5px;
                    }
                  }
                  button.add-to-cart-btn {
                    background: #ffe69c;
                  }
               }
               p.category-name {
                  font-size: 16px;
                  color: rgb(0, 0, 0);
                  margin-top: 40px;
               }
               .description {
                  font-size: 14px;
                  color: rgb(134, 134, 134);
                  ul {
                    padding-left: 15px;
                    li {
                      padding: 5px 0;
                    }
                  }
               }
               .social-links {
                  display: flex;
                  margin-top: 25px;
                  span {
                    margin-right: 10px;
                    font-size: 17px;
                  }
                  .social-icon {
                    background: #fff3cd;
                    margin-right: 5px;
                    padding: 1px 9px;
                    border-radius: 5px;
                    :hover {
                      background: #ffc107;
                      cursor: pointer;
                    }
                  }
               }
            }
        `,
    },
    styles: {

    },
};