import {css} from "@emotion/css";

export const HeaderStyleSheet = {
    classes: {
        header: css`
          display: flex;
          align-items: center;
          flex-shrink: 0;
          padding: 15px 15px 15px 0;
          border-bottom: 1px solid #e3dede;
          
          .mobile-menu-icon {
            display: none;
            margin-right: 10px;
            color: #000;

            @media only screen and (max-width: 1100px) {
              display: inline-block;
            }
          }
          .search-bar {
              height: 34px;
              display: flex;
              width: 100% !important;
              max-width: 450px;
              
              input {
                width: 100% !important;
                height: 100%;
                border: none;
                background-color: #ffffff !important;
                border-radius: 8px;
                font-family: "Inter", sans-serif;
                font-size: 14px;
                font-weight: 500;
                padding: 0 40px 0 16px;
                box-shadow: 0 0 0 2px rgba(134, 140, 160, 0.02);
                background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23717790c7'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
                background-size: 14px;
                background-repeat: no-repeat;
                background-position: 96%;
                color: #000;
                border: 1px solid #e5e2e1;
              }
          }
          .user {
              &-settings {
                display: flex;
                align-items: center;
                padding-left: 20px;
                flex-shrink: 0;
                margin-left: auto !important;
                cursor: pointer;
                user-select: none;
                svg {
                  width: 20px;
                  flex-shrink: 0;
                  color: #808191;
                  @media screen and (max-width: 575px) {
                    display: none;
                  }
                }
                .notify {
                  position: relative;
                  svg {
                    width: 20px;
                    margin-left: 24px;
                    flex-shrink: 0;
                    color: #808191;
                  }
                  .notification {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #ec5252;
                    position: absolute;
                    right: 1px;
                    border: 1px solid #1f1d2b;
                    top: -2px;
                    @media screen and (max-width: 575px) {
                      display: none;
                    }
                  }
                }
              }
              &-img {
                width: 30px;
                height: 30px;
                flex-shrink: 0;
                object-fit: cover;
                border-radius: 50%;
              }
              &-name {
                color: #808191;
                font-size: 14px;
                margin: 0 6px 0 12px;
                @media screen and (max-width: 575px) {
                  display: none;
                }
              }
            } 
        `,
        menu: css`
          display: inline-block !important;
          float: right;
        `,
    },
    styles: {

    },
};