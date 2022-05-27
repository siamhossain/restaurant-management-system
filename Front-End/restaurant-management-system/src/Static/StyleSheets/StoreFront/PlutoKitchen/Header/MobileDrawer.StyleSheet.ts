import {css} from "@emotion/css";

export const

    MobileDrawerStyleSheet = {
    classes: {
        root: (open: boolean | undefined) => css`
            .overlay {
              position: ${open ? "fixed" : "relative"};
              z-index: 1000;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0,0,0,0.64);
              opacity: ${open ? 1 : 0};
              transition: opacity 0.3s;
            }
            
            .drawer {
              position: fixed;
              z-index: 2000;
              top: 0;
              left: ${open ? "0" : "-300%"};
              bottom: 0;
              width: 250px;
              background: #2d2d2d;
              transition: all 0.3s;
              
              .profile-section {
                padding: 15px 25px;
                background: #fe9400;
                
                button {
                  color: #fff;
                  background: transparent;
                  float: right;
                  .ub-w_16px {
                    width: 20px;
                    height: 20px;
                  }
                }
                .avatar {
                  margin-top: 25px;
                }
                .MuiAvatar-colorDefault {
                    color: #000000;
                    background-color: #ffffff ;
                }
                .profile-name {
                  color: #fff;
                  margin: 15px 0;
                }
              }
              
              .mobile-nav-container {
                ul.mobile-nav-list {
                  list-style: none;
                  margin: 0;
                  padding-left: 25px;
                  padding-top: 20px;
                  li {
                    padding: 6px 0; 
                    a {
                      color: #fe9400;
                      //font-weight: bold;
                      font-size: 15px;
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