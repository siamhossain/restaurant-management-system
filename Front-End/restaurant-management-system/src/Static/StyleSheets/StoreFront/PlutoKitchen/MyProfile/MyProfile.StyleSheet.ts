import {css} from "@emotion/css";

export const MyProfileStyleSheet = {
    classes: {
        root: css`
          padding: 100px 0;
          
            h2 {
              font-size: 18px;
              margin: 0;
              margin-bottom: 40px;
            }
            .profileInfo {
              margin-bottom: 30px;
              h5 {
                font-size: 14px;
                margin: 0;
                margin-bottom: 10px;
                display: inline-block;
                margin-right: 10px;
              }
              p {
                color: #727274;
                font-size: 14px;
                margin: 0;
              }
              button {
                display: inline-block;
                color: green;
                background: #e7e7e7;
                padding: 3px 7px;
              }
            }
            
            .profileActionBtn {
            margin-top: 83px;
              button {
                background: #ff9d1a;
                color: #fff;
                margin-right: 10px;
                border-radius: 5px;
                padding: 12px 35px;
                font-weight: bold;
                cursor: pointer;
                margin-bottom: 15px;
              }
            }
            .profileImg {
              margin-bottom: 35px;
              .avatar {
                .MuiAvatar-root {
                    width: 170px;
                    height: 170px;
                }
              }
            }
        `,
    },
    styles: {

    },
};