import {css} from "@emotion/css";

export const WaterTankDebuggerStyleSheet: any = {
    classes: {
        root: (fullScreen: boolean) => css`
          position: fixed;
          z-index: 9999;
          border: 1px solid #cccccc;
          top: ${fullScreen ? "10px" : "35%"};
          left: 10px;
          bottom: 10px;
          right: 10px;
          background: #ffffff;
          border-radius: 5px;
          
          .__debugger_title {
            padding: 8px 23px;
            font-size: 14px;
            background: #eaeaea;
            border-radius: 5px;
            font-weight: bold;
            
            .__right_section {
              float: right;
              clear: both;
              margin-top: -3px;
              
              button, select {
                padding: 4px;
                border-radius: 4px;
                border: 1px solid #a6a6a6;
                cursor: pointer;
                margin-left: 10px;
                outline: none;
                
                :hover {
                  background: #e5e5e5;
                }
              }
            }
          }
          
          .__debugger_body {
            
          }
        `,
    },
    styles: {
        debuggerComponentStyle: {
            position: "absolute",
            top: "55px",
            left: "20px",
            right: "20px",
            bottom: "20px",
            overflow: "auto",
            borderRadius: 5,
            padding: 15
        }
    }
};