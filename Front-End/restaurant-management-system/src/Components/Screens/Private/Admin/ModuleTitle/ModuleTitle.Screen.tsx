import React, {Fragment, ReactElement} from 'react';
import {css} from "@emotion/css";
import {Button, ButtonProps} from '@material-ui/core';

const __css_container = css`
  padding: 0px 30px;
  table {
    width: 100%;
    margin-bottom: 20px;
    
    td:first-child {
      text-align: left;
      h2 {
        margin: 0;
      }
    }
    td:last-child {
      text-align: right;
      
      .button {
        background-color: rgb(0, 171, 85);
        box-shadow: rgba(0, 171, 85, 0.24) 0px 8px 16px 0px;
        color: #ffffff;
        font-weight: bold;
        text-transform: capitalize;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      }
    }
  }
`;

interface IModuleTitleScreenProps {
    moduleTitle?: string,
    actionButtons?: {
        label: string,
        buttonProps?: ButtonProps,
    }[],
}

const ModuleTitleScreen: React.FC<IModuleTitleScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <div className={__css_container}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <h2>{props.moduleTitle}</h2>
                        </td>
                        <td>
                            {props.actionButtons?.map((actionButton, index) => (
                                <Button
                                    key={index}
                                    className={"button"}
                                    variant={"contained"}
                                    style={{
                                        borderRadius: 8,
                                    }}
                                    {...actionButton.buttonProps}>
                                    {actionButton.label}
                                </Button>
                            ))}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export {ModuleTitleScreen};
