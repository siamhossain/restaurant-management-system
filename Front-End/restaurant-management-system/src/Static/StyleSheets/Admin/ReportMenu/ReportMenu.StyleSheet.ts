import {css} from "@emotion/css";

export const ReportMenuStyleSheet = {
    classes: {
        root: css`
            border-top: 1px solid #e2e2e2;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
            
            
            .item {
              width: 100%;
              padding: 0;
              margin: 0;
              border: 1px solid #f3f3f3;
              border-top: 0;
              cursor: pointer;
              user-select: none;
              
              td:first-child {
                width: 35px;
                vertical-align: middle;
                padding: 10px 10px;
                
                img {
                  width: 35px;
                  vertical-align: middle;
                  padding: 0 5px;
                }
              }
              
              td:nth-child(2) {
                padding: 10px 15px;
              }
              
              td:nth-child(3) {
                padding: 10px 15px;
                text-align: right;
              }
            }
            
            .sub-menu-container {
              padding-left: 52px;
            }
        `,
    },
    styles: {},
};