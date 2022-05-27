import {css} from "@emotion/css";

export const TopProductCardStyleSheet = {
    classes: {
        root: css`
            .top-products-wrapper {
              
              .top-product-card {
                  position: relative;
                  background-color: #ffffff;
                  border-radius: 20px;
                  overflow: hidden;
                  transition: 0.4s;
                  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
                  cursor: pointer;
                  height: 400px;
                  .top-product-card-bg {
                    background-size: cover !important;
                    background-position: center !important;
                    background-repeat: no-repeat;
                    height: 250px;
                    :hover {
                      transform: scale(1.2);
                      transition: 0.5s;
                    }
                  }
                  .topProducts-card-info {
                    padding: 50px 30px 25px 30px;
                    .product-name {
                      color: #ff7551;
                      font-weight: bold;
                      margin-bottom: 7px;
                      font-size: 18px;
                    }
                    .weekly-sales {
                       color: #b5b0b0;
                    }
                  }
              }
            }
        `,
    },
    styles: {

    },
};