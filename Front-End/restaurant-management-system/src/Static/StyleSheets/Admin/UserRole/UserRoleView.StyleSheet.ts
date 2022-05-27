import {css} from "@emotion/css";

export const UserRoleViewStyleSheet = {
    classes: {
        root: css`
            font-size: 15px !important; 
            
            .ub-bg-clr_3366FF {
                background-color: #ff9f29 !important;
            }
            
            .role-list {
              a {
                background: #e7e5e5 !important;
                display: flex;
                align-items: center;
                padding: 10px;
                user-select: none;
                width: 100%;
                
                
                .sidebar-wrapper__icon {
                  display: inline-block;
                  margin-right: 15px;
                }
              }
            }
        `,
    },
    styles: {

    },
};