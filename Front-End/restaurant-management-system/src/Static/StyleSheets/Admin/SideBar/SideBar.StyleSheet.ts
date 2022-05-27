import {css} from "@emotion/css";

export const SideBarStyleSheet = {
    classes: {
        root:(mobile: boolean| undefined) => css`
            .sidebar {
              z-index: 2000;
              width: 250px;
              height: 100%;
              padding: 30px 0 30px 30px;
              padding-top: 18px;
              display: flex;
              flex-direction: column;
              flex-shrink: 0;
              transition-duration: 0.2s;
              overflow-y: auto;
              overflow-x: hidden;
              
              @media only screen and (max-width: 1100px) {
                display: ${mobile ? "flex" : "none"};
              }

             
             
              .logo {
                display: none;
                width: 30px;
                height: 30px;
                background-color: #22b07d;
                flex-shrink: 0;
                color: #fff;
                align-items: center;
                border-radius: 50%;
                justify-content: center;
            
                &-expand {
                  text-decoration: none;
                  color: #ff7551;
                  font-size: 19px;
                  font-weight: 600;
                  line-height: 34px;
                  position: sticky;
                  top: 0;
                  &:before {
                    content: "";
                    position: absolute;
                    top: -30px;
                    left: 0;
                    background: #fff;
                    width: 200px;
                    height: 70px;
                    z-index: -1;
                  }
                }
              }
              
              .side-wrapper {
                border-bottom: 1px solid rgb(131 132 147 / 24%);
                padding: 36px 0;
                //width: 100%;
                
                .side-title {
                  font-size: 12px;
                  letter-spacing: 0.07em;
                  margin-top: 12px !important;
                  margin-bottom: 24px;
                  color: #808191;
                }
              
                .side-menu {
                  //display: flex;
                  //flex-direction: column;
                  
                  
                  a {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: #000;
                    cursor: pointer;
                    margin: 25px 0;
                    user-select: none;
                    
                    .subItem {
                      svg {
                        width: 30px;
                        height: 30px;
                        padding: 7px;
                        border-radius: 10px;
                        background-color: #e2dfdf;
                        margin-right: 12px;
                        
                      }
                    }
                    
                    :hover {
                          .sidebar-wrapper__icon svg {
                            color: #fff;
                            background: #32a7e2;
                          }
                    }
                  }
                  
                  .sidebar-wrapper__icon svg {
                    width: 30px;
                    height: 30px;
                    padding: 7px;
                    border-radius: 10px;
                    background-color: #e2dfdf;
                    flex-shrink: 0;
                    margin-right: 12px;
                    &:hover {
                      color: #fff;
                      background: #32a7e2;
                    }
                  }
                  
                  .subMenu {
                    margin: 0;
                    a {
                      margin: 15px 0 !important;
                      &:hover {
                        svg {
                          color: #fff;
                          background: #6c5ecf;
                      }
                    }
                    svg {
                      margin-right: 12px;
                      width: 25px;
                      height: 25px;
                      padding: 6px;
                      border-radius: 10px;
                      background-color: #e2dfdf;
                      flex-shrink: 0;
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