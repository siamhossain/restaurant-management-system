import {css} from "@emotion/css";

export const ProfileMenuStyleSheet = {
    classes: {
        root: css`

        `,
        ProfileMenuList: css`
            display: grid;
            padding: 0;

            a {
              font-size: 14px;
              padding: 15px 0;
              color: rgb(14, 14, 14);
              font-weight: bold;
              display: inline-block;

              :hover{
                color: #fd9300;
              }

              svg {
                margin: auto;
                font-size: 22px;
              }

            }
        `,
    },
    styles: {

    },
};