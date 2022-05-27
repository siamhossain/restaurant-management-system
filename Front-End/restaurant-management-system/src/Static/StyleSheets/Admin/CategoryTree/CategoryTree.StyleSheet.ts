import {css} from "@emotion/css";

export const CategoryTreeStyleSheet = {
    classes: {
        root: css`
            .treeLevelWrap {
               display: inline-block;
               border: 1px solid #e5e5ef;
             }
             
            .treeLevel{
              padding: 5px 10px;
              border-bottom: 1px solid #e5e5ef;
              display: flex;
              align-items: flex-start;
                  
                  .MuiIconButton-root {
                    padding: 5px;
                    display: none;
                  }
                  
                  .icon-button {
                    vertical-align: middle;
                    margin-top: 2px;
                    svg {
                      font-size: 20px;
                    }
                  }
                  
                  .success-button {
                    * {
                      color: #4CAF50 !important;
                    }
                  }
                  
                  .error-button {
                    * {
                      color: #f44336 !important;
                    }
                  }
                  
                  .info-button {
                    * {
                      color: #2196F3 !important;
                    }
                  }
                  
                  .warning-button {
                    * {
                      color: #ff9800 !important;
                    }
                  }
                  
                  img{
                    width: 20px;
                    margin-right: 5px;
                    margin-top: 5px;
                    vertical-align: middle;
                  }
               
              
              :hover{
                  .MuiIconButton-root{
                    display: block !important;
                    cursor: pointer;
                  }
              }
            }
        `,
    },
    styles: {

    },
};
