import {css} from "@emotion/css";
import SignInImage from "@/Static/Images/StoreFront/PlutoKitchen/SignIn/signin-image.png";

export const SignInStyleSheet = {
    classes: {
        root: css`
          //.sign-in-section {
              .sign-in {
                  .ub-mb_24px {
                        margin-bottom: 15px !important;
                    }
                
                .sign-in-logo {
                  background-color: #ffd200;
                  display: inline-block;
                  padding-top: 120px;
                }
    
                h2 {
                  margin-top: 60px;
                  margin-bottom: 0px;
                  font-size: 21px;
                  @media only screen and (max-width: 900px){
                    font-size: 15px;
                  }
                }
    
                p.signin-with-phone {
                  margin-top: 0px;
                  color: #7d7d7d;
                  font-size: 15px;
                  border-bottom: 1px solid #eaeaea;
                  padding-bottom: 5px;
                  @media only screen and (max-width:900px){
                    font-size: 12px;
                  }
                }
                .sign-in-from {
                  
                  h1 {
                    font-size: 23px;
                    @media only screen and (max-width:900px){
                      font-size: 15px;
                    }
                  }
    
                  p {
                    margin-top: 0px;
                    color: #000; 
                    font-size: 15px;
                    padding-bottom: 5px;
                  }
    
                  .phone-number {
                    //background: #eaeaea;
                    height: 35px;
                    width: 400px;
                    @media only screen and (max-width: 900px) {
                      width: 100%;
                    }
                  }

                  .button {
                    button {
                      background-color: #ffd200;
                      padding: 10px;
                      font-size: 16px;
                      font-weight: bold;
                      margin-top: 5px;
                      cursor: pointer;
                      height: 35px;
                      width: 100%;
                      text-align: center;
                      border-radius: 5px;
                      
                      @media only screen and (max-width:900px){
                        font-size: 14px;
                      }
                    }
                  }

                  .sign-in-bottom {
                    margin-top: 25px;
                    margin-bottom: 0px;
                    color: #000;
                    font-size: 14px;

                    span {
                      color: #f7880a;
                      cursor: pointer;
                    }

                  }

                  p {
                    span {
                      color: #f7880a;
                      cursor: pointer;
                      font-size: 14px;
                    }
                  }
                }
                  
                }
    
              }

            .sign-in-image {
              background: url(${SignInImage});
              height: 100vh;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center center;
              @media only screen and (max-width:1050px){
                .sign-in-image {
                  background: none !important;
                }
              }
            }
          
        `,
    },
    styles: {

    },
};