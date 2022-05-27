import {css} from '@emotion/css';

export const WelcomeStyleSheet = {
    classes: {
        root: css`
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 100vh;
            background: #282c34;
            
            & .title {
                padding: 5px 20px;
                font-weight: bold;
                font-size: 30px;
                color: #61dafb;
            }
            
            & img {
                width: 100px;
            }
        `,
    },
    styles: {

    },
};
