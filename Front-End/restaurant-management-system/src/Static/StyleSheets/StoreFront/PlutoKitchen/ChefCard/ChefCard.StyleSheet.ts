import {css} from "@emotion/css";

export const ChefCardStyleSheet = {
    classes: {
        root: css`
            .chef-card-container {
              text-align: center;
              border: 1px solid #e5e5e5;
              .chef-card-bg {
                height: 420px;
                background-size: cover !important;
                background-repeat: no-repeat !important;
                background-position: center !important;
                margin-bottom: 25px;
              }
              .chef-card-info {
                h2.name {
                  font-size: 25px;
                  color: rgb(3, 4, 4);
                  margin: 0;
                  margin-bottom: 5px;
                }
                h5.designation {
                    background: #ffed9a;
                    text-transform: uppercase;
                    font-size: 14px;
                    display: inline-block;
                    margin: 0;
                    padding: 1px 10px;
                    margin-bottom: 10px;
                }
                p.details {
                  font-size: 14px;
                  margin: 0;
                  margin-bottom: 10px;
                  padding: 10px 50px;
                  
                   
                @media only screen and (max-width: 900px) {
                  padding: 5px 30px;
                }
                  @media only screen and (max-width: 350px) {
                    padding: 5px 10px;
                  }
              }
            }
        `,
    },
    styles: {

    },
};