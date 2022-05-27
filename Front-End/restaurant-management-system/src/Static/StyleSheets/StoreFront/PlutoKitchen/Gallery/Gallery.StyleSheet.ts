import {css} from "@emotion/css";

export const GalleryStyleSheet = {
    classes: {
        root: css`
          margin-top: 50px;
          margin-bottom: 50px;

          @media only screen and (max-width:900px) {
            margin-top: 30px;
          }
          
          h1.section-heading {
              text-align: center;
            @media only screen and (max-width:500px) {
              font-size: 25px;
            }
            
              span {
                color: #fe9400;
              }
          }
          .gallery-img {
              img {
                width: 100%;
                height: auto;
              }
              img:hover {
                transform: scale(1.05);
                cursor: pointer;
                transition: 0.5s;                
              }
          }
          
          .see-all-button {
            text-align: center;
            button {
              border-radius: 5px;
              background-color: rgb(0, 0, 0);
              width: 150px;
              height: 40px;
              font-size: 20px;
              color: rgb(255, 194, 34);
              margin-top: 50px;
              cursor: pointer;
            }
          }
          
        `,
    },
    styles: {

    },
};