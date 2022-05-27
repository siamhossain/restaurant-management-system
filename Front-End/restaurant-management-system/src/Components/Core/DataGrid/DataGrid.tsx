import React, {Fragment, ReactElement, ReactNode} from 'react';
import {css} from "@emotion/css";
import {Grid, TextField} from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import {TextFieldProps} from "@material-ui/core/TextField/TextField";
import {IconButton, TextInput} from "evergreen-ui";
import {Button, Select} from 'evergreen-ui';
import {convertToNumber} from "@/App/Functions/Custom";


const __css_dataTable = css`
  padding: 0;
  //border-radius: 16px;
  //box-shadow: rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px;
`;

const __css_dataTable_filter_body = css`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  padding: 15px;
`;

const __css_search_textField = css`
  * {
    border-color: #e3e3e3 !important;
    border-radius: 8px !important;
  }
  transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, width 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const __css_dataTable_footer_body = css`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  padding: 40px 12px;
`;

const __css_dataTable_container = css`
  overflow-x: auto;
  
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    margin: 0;
  }
`;

const __css_tableRow = css`
  border-bottom: 1px solid #e5e5e5; 
`;

const __css_tableHeader = css`
  //border: 1px solid red !important;
`;

const __css_tableBody = css`
  
`;

const __css_tableHeading = css`
  padding: 15px;
  font-size: 14px;
  user-select: none;
`;

const __css_tableData = css`
  padding: 13px 15px;
  font-size: 13px;
  
  img{
    width: 40px;
  }
`;

const __css_tfoot = css`
  margin-top: 50px;
`;


const __css_pagination = css`
    .pagination-steps {
        text-align: right;
        
        @media only screen and (max-width: 500px) {
            text-align: left;
            margin-top: 15px;
        }
    }
`;

const __css_status = css`
    background: #ffe9cc;
    display: inline-block;
    padding: 5px 15px;
`;

const __css_action_btn = css`
  border-radius: 5px;
  background-color: rgb(255, 194, 34);
  width: 92px;
  height: 36px;
  font-size: 14px;
  color: rgb(0, 0, 0);
  font-weight: bold;
  vertical-align: middle;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;


const DataGrid = {
    Wrapper: (props: { children?: React.ReactNode, style?: React.CSSProperties }): ReactElement => {
        return (
            <Fragment>
                <div style={props.style} className={__css_dataTable}>
                    {props.children}
                </div>
            </Fragment>
        );
    },
    FilterBody: (props: { children?: React.ReactNode, style?: React.CSSProperties }): ReactElement => {
        return (
            <Fragment>
                <div style={props.style} className={__css_dataTable_filter_body}>
                    {props.children}
                </div>
            </Fragment>
        );
    },

    Search: (props: { children?: React.ReactNode, style?: React.CSSProperties, inputProps?: TextFieldProps, value?: unknown, onChange?(e: React.ChangeEvent<HTMLInputElement>): void, onKeyDown?(e: React.KeyboardEvent<HTMLInputElement>): void }): ReactElement => {
        return (
            <Fragment>
                <TextField
                    className={__css_search_textField}
                    variant={"outlined"}
                    placeholder={"Search"}
                    size={"small"}
                    InputProps={{
                        startAdornment: <span style={{paddingRight: 10}}><SearchIcon
                            style={{fontSize: 18, color: "#929292"}}/></span>
                    }}
                    style={{
                        ...props.style,
                    }}
                    value={props.value}
                    onChange={props.onChange}
                    onKeyDown={props.onKeyDown}
                    {...props.inputProps}
                />
            </Fragment>
        );
    },


    FooterBody: (props: { children?: React.ReactNode, style?: React.CSSProperties }): ReactElement => {
        return (
            <Fragment>
                <div style={props.style} className={__css_dataTable_footer_body}>
                    {props.children}
                </div>
            </Fragment>
        );
    },


    GridPagination: (props: {
        children?: React.ReactNode, style?: React.CSSProperties,
        pageLimit?: number,
        onChangePageLimit?(limit: number): void,
        pageNumber?: number,
        onChangePageNumber?(page_number: number): void,
        onNavigateToPageNumber?(): void,
        totalPages?: number,
        onNavigateToFirstPage?(): void,
        onNavigateToPrevPage?(): void,
        onNavigateToNextPage?(): void,
        onNavigateToLastPage?(): void,

        firstPageDisabled?: boolean,
        prevPageDisabled?: boolean,
        nextPageDisabled?: boolean,
        lastPageDisabled?: boolean,
    }): ReactElement => {
        return (
            <Fragment>
                <div style={props.style}>
                    <div className={__css_pagination}>
                        <Grid container>
                            <Grid item xs={12} lg={6}>
                                <Grid container>
                                    <Grid item xs={5} lg={6}>
                                        <div style={{fontSize: 14, color: "#484848", marginBottom: 5}}>Rows Per Page
                                        </div>
                                        <Select
                                            width={70}
                                            value={props.pageLimit}
                                            onChange={event => {
                                                if (props.onChangePageLimit) {
                                                    props.onChangePageLimit(convertToNumber(event.target.value));
                                                }
                                            }}>
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={30}>30</option>
                                            <option value={50}>50</option>
                                            <option value={70}>70</option>
                                            <option value={100}>100</option>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={7} lg={6}>
                                        <div style={{fontSize: 14, color: "#484848", marginBottom: 5}}>Page Number</div>
                                        <TextInput
                                            width={80}
                                            display={"inline-block"}
                                            marginRight={10}
                                            textAlign={"center"}
                                            value={props.pageNumber}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                if (props.onChangePageNumber) {
                                                    props.onChangePageNumber(convertToNumber(e.target.value));
                                                }
                                            }}
                                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                                if (e.keyCode === 13 && props.onNavigateToPageNumber) {
                                                    props.onNavigateToPageNumber();
                                                }
                                            }}
                                        />
                                        <span style={{fontSize: 13}}>
                                            of &nbsp;<b>{props.totalPages}</b>
                                        </span>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <div className={"pagination-steps"}>
                                    <div style={{display: "inline-block"}}>
                                        <div style={{
                                            fontSize: 14,
                                            color: "#484848",
                                            marginBottom: 5,
                                            textAlign: "left"
                                        }}>Navigate to page
                                        </div>
                                        <DataGrid.GridButton
                                            onClick={props.onNavigateToFirstPage}
                                            disabled={props.firstPageDisabled}>
                                            First
                                        </DataGrid.GridButton>
                                        <DataGrid.GridButton
                                            onClick={props.onNavigateToPrevPage}
                                            disabled={props.prevPageDisabled}>
                                            Previous
                                        </DataGrid.GridButton>
                                        <DataGrid.GridButton
                                            onClick={props.onNavigateToNextPage}
                                            disabled={props.nextPageDisabled}>
                                            Next
                                        </DataGrid.GridButton>
                                        <DataGrid.GridButton
                                            onClick={props.onNavigateToLastPage}
                                            disabled={props.lastPageDisabled}>
                                            Last
                                        </DataGrid.GridButton>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Fragment>
        );
    },

    GridButton: (props: { children?: React.ReactNode, style?: React.CSSProperties, btnText?: string, onClick?(): any, disabled?: boolean }): ReactElement => {
        return (
            <Fragment>
                <Button onClick={props.onClick} disabled={props.disabled} marginRight={12} size="small"
                        style={props.style}>{props.children}</Button>
            </Fragment>
        );
    },


    Container: (props: { children?: React.ReactNode, style?: React.CSSProperties }): ReactElement => {
        return (
            <Fragment>
                <div className={__css_dataTable_container}>
                    <table style={props.style}>
                        {props.children}
                    </table>
                </div>
            </Fragment>
        );
    },

    Row: (props: { children?: React.ReactNode, style?: React.CSSProperties }): ReactElement => {
        return (
            <Fragment>
                <tr style={props.style} className={__css_tableRow}>{props.children}</tr>
            </Fragment>
        );
    },

    Header: (props: { children?: React.ReactNode }): ReactElement => {
        return (
            <Fragment>
                <thead className={__css_tableHeader}>{props.children}</thead>
            </Fragment>
        );
    },

    Body: (props: { children?: React.ReactNode }): ReactElement => {
        return (
            <Fragment>
                <tbody className={__css_tableBody}>{props.children}</tbody>
            </Fragment>
        );
    },


    Heading: (props: { children?: React.ReactNode, style?: React.CSSProperties, align?: "left" | "center" | "right", width?: string | number }): ReactElement => {
        return (
            <Fragment>
                <th
                    style={{
                        textAlign: props.align,
                        minWidth: props.width,
                        width: props.width,
                        ...props.style,
                    }}
                    className={__css_tableHeading}>
                    {props.children}
                </th>
            </Fragment>
        );
    },


    Data: (props: { children?: React.ReactNode, style?: React.CSSProperties, align?: "left" | "center" | "right", width?: string | number }): ReactElement => {
        return (
            <Fragment>
                <td
                    style={{
                        textAlign: props.align,
                        minWidth: props.width,
                        width: props.width,
                        ...props.style,
                    }}
                    className={__css_tableData}>
                    {props.children}
                </td>
            </Fragment>
        );
    },

    SpanData: (props: { children?: React.ReactNode, style?: React.CSSProperties, align?: "left" | "center" | "right", width?: string | number }): ReactElement => {
        return (
            <Fragment>
                <td colSpan={6}
                    style={{
                        textAlign: props.align,
                        minWidth: props.width,
                        width: props.width,
                        ...props.style,
                    }}
                    className={__css_tableData}>
                    {props.children}
                </td>
            </Fragment>
        );
    },

    Footer: (props: { children?: React.ReactNode }): ReactElement => {
        return (
            <Fragment>
                <tfoot>{props.children}</tfoot>
            </Fragment>
        );
    },

    DataActionButton: (props: {
        icon?: React.ReactNode,
        mode?: "danger" | "success" | "warning" | "info" | "none",
        onClick?(): void,
    }): ReactElement => {
        return (
            <Fragment>
                <IconButton
                    icon={<span className={css` svg {font-size: 17px;}`}>{props.icon}</span>}
                    marginRight={10}
                    intent={props.mode}
                    height={30}
                    style={{display: "inline-block"}}
                    onClick={props.onClick}
                />
            </Fragment>
        );
    },

    Status: (props: {
        children?: React.ReactNode,
        status?: "Pending" | "Delivered" | "cancel",
    }): ReactElement => {
        return (
            <Fragment>
                <div className={__css_status}>{props.children}</div>
            </Fragment>
        );
    },

    ActionButton: (props: { children?: React.ReactNode }): ReactElement => {
        return (
            <Fragment>
                <div className={__css_action_btn}>{props.children}</div>
            </Fragment>
        );
    },



};


export {DataGrid};
