import {css} from "@emotion/css";

export const SpecialMenuCardStyleSheet = {
    classes: {
        root: css`
          .card-container {
            border: 1px solid #efefef;
            border-radius: 5px;
            height: 396px;
            cursor: pointer;
            
            
            @media only screen and (max-width: 900px) {
              height: 340px;
            }
            
            .card-bg {
              height: 300px;
              background-repeat: no-repeat !important;
              background-size: cover;
              background-position: center !important;
              
              @media only screen and (max-width: 900px) {
                height: 250px;
              }
            }
            :hover {
              .card-bg {
                transform: scale(1.07);
                transition: 0.6s;
              }
              box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
              transition: 0.4s;
            }
            .card-info {
              padding: 0 25px;
              .card-menu-name {
                font-size: 16px;
                font-weight: bold;
                text-align: left;
              }
              .card-bottom {
                margin-top: 5px;
                text-align: left;
                p.price {
                  font-size: 16px;
                  color: rgb(144, 144, 144);
                  font-weight: bold;
                  margin: 0;
                  display: inline-block;
                }
                p.compare-at-price {
                  font-size: 16px;
                  color: rgb(144, 144, 144);
                  text-decoration: line-through;
                  margin: 0;
                  display: inline-block;
                  padding-left: 25px;
                }
                button.add-to-cart-btn {
                    background: #ffc222;
                    float: right;
                    padding: 5px 7px;
                    border-radius: 3px;
                    cursor: pointer;
                    svg {
                      font-size: 15px;
                    }
                    :hover {
                      background: #f5b702;
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