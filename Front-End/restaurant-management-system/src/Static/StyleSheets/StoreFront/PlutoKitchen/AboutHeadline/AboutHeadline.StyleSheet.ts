import {css} from "@emotion/css";
import HeadingBG from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/About-us--header-BG.png";

export const AboutHeadlineStyleSheet = {
    classes: {
        root: css`
            .about-heading-container {
              
              .headline-bg {
                  background: url(${HeadingBG});
                  height: 135px;
                  color: white;
                  text-align: center;
                  padding-top: 25px;
                  h1 {
                    margin: 0;
                  }
                  p {
                    margin: 0;
                    span {
                      color: #e0b804;
                    }
                  }
              }
              {
                text-align: center;
              }
            }
        `,
    },
    styles: {

    },
};