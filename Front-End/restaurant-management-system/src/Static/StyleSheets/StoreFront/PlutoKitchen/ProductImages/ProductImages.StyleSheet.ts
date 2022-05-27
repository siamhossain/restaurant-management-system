import {css} from "@emotion/css";

export const ProductImagesStyleSheet = {
    classes: {
        root: css`
            .magnify-container {
              background: #f2f2f2;
              height: 500px;
            }
            .singleSmallImg {
                margin-right: 15px;
                img{
                  width: 120px;
                  height: 93px;
                  border-radius: 15px;
                  
                  @media only screen and (max-width: 900px) {
                    width: 100px;
                    height: 70px;
                  }
                  @media only screen and (max-width: 600px) {
                    width: 70px;
                    height: 50px;
                  }
                  @media only screen and (max-width: 400px) {
                    width: 100px;
                    height: 70px;
                  }
                }
            }
            .procuct_image_slider {
                  margin-top: 15px;
                  display: flex;
            }
            .slick-next:before {
                  content: "\\276F";
                  z-index: 500;
                  font-family: auto;
                  font-weight: bold;
                  font-size: 22px;
                  color: #000000;
            }
            .slick-prev:before {
                  content: "\\276E";
                  z-index: 500;
                  font-family: auto;
                  font-weight: bold;
                  font-size: 22px;
                  color: #000000;
            }
            .slick-prev {
                  left: 10px;
                  z-index: 500;
                  background: #ffffff;
                  opacity: 0.5;
                  :hover {
                    left: 10px;
                    z-index: 500;
                    background: #ffffff;
                    opacity: 0.5;
                  }
            }
            .slick-next {
                  right: 10px;
                  z-index: 500;
                  background: #ffffff;
                  opacity: 0.5;
                  :hover {
                    right: 10px;
                    z-index: 500;
                    background: #ffffff;
                    opacity: 0.5;
                  }
            }
        `,
    },
    styles: {},
};