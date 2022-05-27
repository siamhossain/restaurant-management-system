import {css} from "@emotion/css";

export const MainLayoutStyleSheet = {
    classes: {
        root: css`

        `,
        container:css`
          background-color: #fff;
          height: 100vh;
          display: flex;
          overflow: hidden;
          width: 100%;
          font-size: 15px;
          font-weight: 500;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          position: relative;
          
          @media screen and (max-width: 475px) {
            height: 100vh;
            max-height: 100%;
          }
          .wrapper {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          }
        `,
    },
    styles: {

    },
};