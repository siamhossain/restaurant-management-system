import {css} from "@emotion/css";

export const HeaderStyleSheet = {
    classes: {
        root: css`
            border-bottom: 1px solid #eeeeee;
        `,
        header: css`
            table.header-table {
                width: 100%;
                border-collapse: collapse;
                
                td.logo {
                  vertical-align: middle;
                  text-align: left;
                  padding: 5px;
                  width: 120px;
                  
                  * {
                    vertical-align: middle;
                  }
                  
                 img {
                    @media only screen and (max-width: 900px) {
                      width: 70px;
                    }
                    
                    @media only screen and (max-width: 600px) {
                      width: 60px;
                    }
                  }
                  
                  .mobile-menu-icon {
                    display: none;
                    margin-right: 10px;
                    
                    @media only screen and (max-width: 900px) {
                      display: inline-block;
                    }
                  }
                }
                
                td.nav {
                  text-align: right;
                  
                  .nav-container {
                    display: inline-block;
                    a {
                      font-size: 14px;
                      color: rgb(79, 74, 74);
                      margin-left: 20px;
                      padding: 10px;
                      
                      :hover {
                        background: #ececec;
                        transition: 0.5s;
                      }
                    }
                    
                    @media only screen and (max-width: 900px) {
                      display: none;
                    }
                  }
                  
                  .mobile-menu-icons {
                      display: none;
                      
                      @media only screen and (max-width: 900px) {
                        display: inline-block;
                      }
                   }
                  
                  .cart-button {
                    display: inline-block;
                    margin-left: 25px;
                    position: relative;
                    vertical-align: middle;
                    margin-top: 7px;
                    margin-right: 10px;
                    cursor: pointer;
                    
                    .badge {
                      display: inline-block;
                      background: #fe9400;
                      color: #ffffff;
                      border-radius: 50%;
                      width: 15px;
                      height: 15px;
                      padding: 2px;
                      font-size: 8px;
                      text-align: center;
                      font-weight: bold;
                      position: absolute;
                      top: -8px;
                      right: -8px;
                    }
                    
                  }
                }
                
                td.actions {
                  width: 150px;
                  display: inline-block;
                }
              }
        `,
    },
    styles: {

    },
};