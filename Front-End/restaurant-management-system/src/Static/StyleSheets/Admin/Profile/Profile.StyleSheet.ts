import {css} from "@emotion/css";

export const ProfileStyleSheet = {
    classes: {
        root: css`

            /*** Tab  ****/
            .tab-section {
                margin-top: 25px;
                .MuiTab-root {
                  background: #ededed;
                  border-radius: 5px;
                  margin-right: 15px;
                  font-weight: bold;
                  text-transform: capitalize;
                  opacity: 1;
                  @media only screen and (max-width: 600px) {
                    padding: 6px 6px;
                    min-height: 0;
                  }
                }
                .MuiTab-textColorInherit.Mui-selected {
                    background: #ffc107;
                }
                .PrivateTabIndicator-colorSecondary-7 {
                  display: none;
                }
                .MuiTabPanel-root {
                    padding: 0px;
                }
                .css-grk5qk .tab-section .MuiTabPanel-root {
                    padding: 0 !important;
                }
                .tab-panel-container {
                  border: 1px solid #e3e3e3;
                  border-radius: 5px;
                  margin-top: 10px;
                  font-size: 14px;
                  color: rgb(75, 75, 75);
                }
                
                .change-password {
                  background: #ffffff;
                  padding: 50px;
                  h3 {
                    color: #ff3600;
                    margin-bottom: 40px;
                  }
                }
            }
            
            /*----- Tab End  ---*/

            .profile-wrapper {
              background: #ffffff;
              box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
              border-radius: 18px;
              height: 435px;
              @media screen and (max-width: 900px) {
                height: 500px;
              }
              .profile-cover {
                .profile-cover-bg {
                  height: 300px;
                  background-size: cover !important;
                  background-position: center !important;
                  background-repeat: no-repeat !important;
                  border-radius: 18px;
                  position: relative;
                  @media screen and (max-width: 900px) {
                    height: 250px;
                  }
                  
                  .profile-picture {
                    img {
                      position: absolute;
                      bottom: -115px;
                      left: 66px;
                      
                      @media screen and (max-width: 900px) {
                        position: absolute;
                        right: 0;
                        left: 0;
                        margin: auto;
                        bottom: -110px;
                      }
                    }
                  }
                }
              }
              .profile-info {
                padding-top: 25px;
                margin-left: 300px;
                display: flex;
                @media screen and (max-width: 900px) {
                   display: block;
                   text-align: center !important;
                   margin-top: 100px;
                   margin-left: 0px;
                }
                .name {
                  h4 {
                    margin: 0;
                    color: #000;
                    @media screen and (max-width: 900px) {
                      font-size: 22px;
                    }
                  }
                  p {
                    margin: 0;
                    font-size: 14px;
                    color: #9f9f9f;
                  }
                }
                .email {
                  margin-left: 40px;
                  @media screen and (max-width: 900px) {
                    margin-left: 0;
                  }
                  h4 {
                    margin: 0;
                    color: #000;
                    @media screen and (max-width: 900px) {
                      font-size: 18px;
                    }
                  }
                  p {
                    margin: 0;
                    font-size: 14px;
                    color: #9f9f9f;
                  }
                }
              }
            }
            
            .profile-about {
                background: #ffffff;
                padding: 0 0px 25px 0px;
                .about-heading {
                  background: #fff;
                  padding: 30px;
                  border-bottom: 1px solid #e2dbdb;
                  h3 {
                    color: #000;
                    margin: 0;
                  }
                }
                .about-info {
                  padding-left: 30px;
                  @media only screen and (max-width: 300px) {
                      padding-left: 20px;
                  }
                  h4 {
                    color: #ff3600;
                  }
                  p {
                    width: 30%;
                    @media only screen and (max-width: 300px) {
                      width: 100%;
                    }
                  }
                  .personal-info {
                    .personal-info-table {
                      overflow-x: auto;
                      table {
                        th {
                          width: 60%;
                          text-align: left;
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