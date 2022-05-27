import {css} from "@emotion/css";

export const ShopStyleSheet = {
    classes: {
        root: css`
            margin: 100px 0;
          @media only screen and (max-width: 900px) {
            margin: 80px 0;
          }
            .search-box {
               .ub-dspl_flex { 
                  background: #ffc222;
                  color: #000;
              }
              .ub-pst_absolute {
                  right: 0;
              }
              .ub-h_32px {
                  height: 40px;
                  @media only screen and (max-width: 1100px) {
                  width: 100%;
                }
              }
              .ub-w_32px {
                  width: 40px;
              } 
              input {
                :focus {
                  .ub-dspl_flex { 
                      background: red;
                      color: #000;
                  }
                }
              }
            }
            
            .category-heading {
              text-transform: uppercase;
              font-size: 18px;
              padding-top: 25px;
            }
            
            .category-tag {
            
              strong.css-1rdjc1y {
                height: 30px;
                margin-bottom: 5px;
              }
              .ub-btrr_4px {
                    border-top-right-radius: 0px;
                }
                .ub-btlr_4px {
                    border-top-left-radius: 0px;
                }
                .ub-bbrr_4px {
                    border-bottom-right-radius: 0px;
                }
                .ub-bblr_4px {
                    border-bottom-left-radius: 0px;
                }
                .ub-b-top_1px-solid-d8dae5 {
                    border: none;
                }
                .ub-ml_8px {
                    margin-left: 0;
                }
                .ub-pt_2px {
                    padding-top: 0px;
                }
                .ub-pb_2px {
                    padding-bottom: 0px;
                }
                .ub-btrr_4px {
                    border-top-right-radius: 0px;
                }
                .ub-btlr_4px {
                    border-top-left-radius: 0px;
                }
                .ub-bbrr_4px {
                    border-bottom-right-radius: 0px;
                }
                .ub-bblr_4px {
                    border-bottom-left-radius: 0px;
                }
            }
            
        `,
    },
    styles: {

    },
};