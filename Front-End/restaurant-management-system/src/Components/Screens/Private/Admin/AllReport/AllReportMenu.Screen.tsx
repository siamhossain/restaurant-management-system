import React, { Fragment, ReactElement } from 'react';
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {ROUTE_PATHS} from "@/Routes";
import {Link} from "react-router-dom";
import {Grid} from "@material-ui/core";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import CustomerInvoiceDetails from "@/Static/Images/All-Report/Invoice/Customer-Invoice-Details.png";
import CustomerInvoiceSummary from "@/Static/Images/All-Report/Invoice/Customer-Invoice-Summary.png";
import SupplierInvoiceDetails from "@/Static/Images/All-Report/Invoice/Supplier-Invoice-Details.png";
import SupplierInvoiceSummary from "@/Static/Images/All-Report/Invoice/Supplier-Invoice-Summary.png";

import SalesDetails from "@/Static/Images/All-Report/Sales Report/Sales-Details.png";
import SalesItemSummary from "@/Static/Images/All-Report/Sales Report/Sales-Item-Summary.png";
import SalesReturnDetails from "@/Static/Images/All-Report/Sales Report/Sales-Return-Details.png";
import SalesReturnSummary from "@/Static/Images/All-Report/Sales Report/Sales-Return-Summary.png";
import SalesSummary from "@/Static/Images/All-Report/Sales Report/Sales-Summary.png";

import Sales from "@/Static/Images/All-Report/Sales-Report.png";
import Purchase from "@/Static/Images/All-Report/Purchase-Report.png";
import Payment from "@/Static/Images/All-Report/Payment-Report.png";
import Invoice from "@/Static/Images/All-Report/Invoice-Report.png";
import Wastage from "@/Static/Images/All-Report/Wastage-Report.png";
import Others from "@/Static/Images/All-Report/Others.png";

import PurchaseReport from "@/Static/Images/All-Report/Purchase report/Purchase-Report.png";
import PurchaseReturnSummary from "@/Static/Images/All-Report/Purchase report/Purchase-return-Summary.png";
import PurchaseReturnreport from "@/Static/Images/All-Report/Purchase report/Purchase-Return-report.png";
import PurchaseSummary from "@/Static/Images/All-Report/Purchase report/Purchase-Summary.png";

import CustomerPaymentDetails from "@/Static/Images/All-Report/Payment/Customer-Payment-Details.png";
import CustomerPaymentSummary from "@/Static/Images/All-Report/Payment/Customer-Payment-Summary.png";
import SupplierPaymentDetails from "@/Static/Images/All-Report/Payment/Supplier-Payment-Details.png";
import SupplierPaymentSummary from "@/Static/Images/All-Report/Payment/Supplier-Payment-Summary.png";

import WastageDetails from "@/Static/Images/All-Report/Wastage Report/Wastage-Details.png";
import WastageSummary from "@/Static/Images/All-Report/Wastage Report/Wastage-Summary.png";

import Monthly from "@/Static/Images/All-Report/Filtered  Report/Monthly.png";
import Weekly from "@/Static/Images/All-Report/Filtered  Report/Weekly.png";
import {ReportMenuStyleSheet} from "@/Static/StyleSheets/Admin/ReportMenu";
import {ApiConfig} from "@/App/Config/Api";


const AllReportMenuScreen = (): ReactElement => {
    const ReportMenu = {
        Container: ({children}: { children: React.ReactNode }) => (
            <div className={ReportMenuStyleSheet.classes.root}>
                {children}
            </div>
        ),

        Item: ({icon, title, children, onClick}: { icon?: string, title?: string, children?: React.ReactNode, onClick?(): void }) => {
            const [open, setOpen] = React.useState(false);

            return (
                <React.Fragment>
                    <table className={"item"} cellPadding={0} cellSpacing={0} onClick={() => {
                        if (children) {
                            setOpen(!open);
                        } else if (typeof onClick === "function") {
                            onClick();
                        }
                    }}>
                        <tbody>
                        <tr>
                            <td>
                                {icon && <img src={icon} alt={"Icon"}/>}
                            </td>
                            <td>
                                {title}
                            </td>
                            {children && (
                                <td>
                                    {open ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                                </td>
                            )}
                        </tr>
                        </tbody>
                    </table>

                    {children && open && (
                        <div className={"sub-menu-container"}>
                            {children}
                        </div>
                    )}
                </React.Fragment>
            );
        },
    };

    return (
        <Fragment>
            <div>

                <Grid container spacing={6} className={"cards"}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>

                        <ReportMenu.Container>
                            <ReportMenu.Item icon={Sales} title={"Sales Report"}>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.SALES_SUMMARY_REPORT}><ReportMenu.Item icon={SalesSummary} title={"Sales Summary"} /></Link>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.SALES_DETAILS_REPORT}><ReportMenu.Item icon={SalesDetails} title={"Sales Details"} /></Link>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.SALES_RETURN_SUMMARY_REPORT}><ReportMenu.Item icon={SalesReturnSummary} title={"Sales Return Summary"} /></Link>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.SALES_RETURN_DETAILS_REPORT}><ReportMenu.Item icon={SalesReturnDetails} title={"Sales Return Details"} /></Link>
                            </ReportMenu.Item>

                            <ReportMenu.Item icon={Purchase} title={"Purchase Report"}>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.PURCHASE_SUMMARY_REPORT}><ReportMenu.Item icon={PurchaseSummary} title={"Purchase Summary"} /></Link>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.PURCHASE_DETAILS_REPORT}><ReportMenu.Item icon={PurchaseReport} title={"Purchase Details"} /></Link>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.PURCHASE_RETURN_SUMMARY_REPORT}><ReportMenu.Item icon={PurchaseReturnSummary} title={"Purchase Return Summary"} /></Link>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.PURCHASE_RETURN_DETAILS_REPORT}><ReportMenu.Item icon={PurchaseReturnreport} title={"Purchase Return Details"} /></Link>
                            </ReportMenu.Item>

                            <ReportMenu.Item icon={Wastage} title={"Wastage Report"}>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.WASTAGE_SUMMARY_REPORT}><ReportMenu.Item icon={WastageSummary} title={"Wastage Summary"} /></Link>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.WASTAGE_DETAILS_REPORT}><ReportMenu.Item icon={WastageDetails} title={"Wastage Details"} /></Link>
                            </ReportMenu.Item>

                            <ReportMenu.Item icon={Payment} title={"Payment Report"}>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.CUSTOMER_PAYMENT_SUMMARY}><ReportMenu.Item icon={CustomerPaymentSummary} title={"Customer Payment Summary"} /></Link>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.SUPPLIER_PAYMENT_SUMMARY}><ReportMenu.Item icon={SupplierPaymentSummary} title={"Supplier Payment Summary"} /></Link>
                            </ReportMenu.Item>

                            <ReportMenu.Item icon={Invoice} title={"Invoice Report"}>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.CUSTOMER_INVOICE_SUMMARY}><ReportMenu.Item icon={CustomerInvoiceSummary} title={"Customer Invoice Summary"} /></Link>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.SUPPLIER_INVOICE_SUMMARY}><ReportMenu.Item icon={SupplierInvoiceSummary} title={"Supplier Invoice Summary"} /></Link>
                            </ReportMenu.Item>

                            <ReportMenu.Item icon={Invoice} title={"Ingredient Report"}>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.INGREDIENT_PURCHASE_SUMMARY}><ReportMenu.Item icon={Others} title={"Ingredient Purchase Summary"} /></Link>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.INGREDIENT_PURCHASE_DETAILS}><ReportMenu.Item icon={Others} title={"Ingredient Purchase Details"} /></Link>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.INGREDIENT_USAGE_SUMMARY}><ReportMenu.Item icon={Others} title={"Ingredient Usage Summary"} /></Link>
                                <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.INGREDIENT_USAGE_DETAILS}><ReportMenu.Item icon={Others} title={"Ingredient Usage Details"} /></Link>
                            </ReportMenu.Item>


                            <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.GENERAL_LEDGER}><ReportMenu.Item icon={Others} title={"General Ledger"} /></Link>
                            <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.ACCOUNTING_HISTORY}><ReportMenu.Item icon={Others} title={"Accounting History"} /></Link>
                            <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.PROFIT_LOSS}><ReportMenu.Item icon={Others} title={"Profit Loss"} /></Link>
                            <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.INCOME_BALANCE_SHEET}><ReportMenu.Item icon={Others} title={"Income Balance Sheet"} /></Link>
                            <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.STOCK_REPORT}><ReportMenu.Item icon={Others} title={"Stock Report"} /></Link>
                            <a href={ApiConfig.REPORTS_ROOT + "/customer-list"} target={'_blank'}><ReportMenu.Item icon={Others} title={"Customer List"}/></a>
                            <a href={ApiConfig.REPORTS_ROOT + "/supplier-list"} target={'_blank'}><ReportMenu.Item icon={Others} title={"Supplier List"} /></a>



                            {/*<ReportMenu.Item icon={Purchase} title={"Purchase Report"}>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.PURCHASE_SUMMARY_REPORT}> <ReportMenu.Item icon={PurchaseSummary} title={"Purchase Summary"}/></Link>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.PURCHASE_REPORT}><ReportMenu.Item icon={PurchaseReturnreport} title={"Purchase Details"}/></Link>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.PURCHASE_RETURN_SUMMARY}><ReportMenu.Item icon={PurchasereturnSummary} title={"Purchase Return Summary"}/></Link>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.PURCHASE_RETURN_REPORT}><ReportMenu.Item icon={PurchaseReport} title={"Purchase Return Details"}/></Link>*/}
                            {/*</ReportMenu.Item>*/}

                            {/*<ReportMenu.Item icon={Payment} title={"Payment Report"}>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.SUPPLIER_PAYMENT_SUMMARY}><ReportMenu.Item icon={SupplierPaymentSummary} title={"Supplier Payment Summary"}/></Link>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.CUSTOMER_PAYMENT_SUMMARY}><ReportMenu.Item icon={CustomerPaymentSummary} title={"Customer Payment Summary"}/></Link>*/}
                            {/*</ReportMenu.Item>*/}

                            {/*<ReportMenu.Item icon={Invoice} title={"Invoice Report"}>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.SUPPLIER_INVOICE_SUMMARY}><ReportMenu.Item icon={SupplierInvoiceSummary} title={"Supplier Invoice Summary"}/></Link>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.CUSTOMER_INVOICE_SUMMARY}><ReportMenu.Item icon={CustomerInvoiceSummary} title={"Customer Invoice Summary"}/></Link>*/}
                            {/*</ReportMenu.Item>*/}

                            {/*<ReportMenu.Item icon={Wastage} title={"Wastage report"}>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.WASTAGE_SUMMARY}><ReportMenu.Item icon={WastageSummary} title={"Wastage Summary"}/></Link>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.WASTAGE_REPORT}><ReportMenu.Item icon={WastageDetails} title={"Wastage Details"}/></Link>*/}
                            {/*</ReportMenu.Item>*/}


                            {/*<ReportMenu.Item icon={Others} title={"Other"}>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.GENERAL_LEDGER}><ReportMenu.Item icon={WastageDetails} title={"General Ledger"}/></Link>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.ACCOUNTING_HISTORY}><ReportMenu.Item icon={WastageDetails} title={"Accounting History"}/></Link>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.PROFIT_LOSS}><ReportMenu.Item icon={WastageDetails} title={"Profit Loss"}/></Link>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.INCOME_BALANCE_SHEET}><ReportMenu.Item icon={WastageDetails} title={"Income Balance Sheet"}/></Link>*/}
                            {/*    <Link to={ROUTE_PATHS.PRIVATE.ADMIN.PRINTABLE_REPORTS.STOCK_REPORT}><ReportMenu.Item icon={WastageDetails} title={"Stock Report"}/></Link>*/}
                            {/*    <Link to={ApiConfig.REPORTS_ROOT + "/customer-list"} target={'_blank'}><ReportMenu.Item icon={WastageDetails} title={"Customer List"}/></Link>*/}
                            {/*    <Link to={ApiConfig.REPORTS_ROOT + "/supplier-list"} target={'_blank'}><ReportMenu.Item icon={WastageDetails} title={"Supplier List"}/></Link>*/}
                            {/*</ReportMenu.Item>*/}

                        </ReportMenu.Container>

                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <ModuleTitleScreen moduleTitle={"Filtered Reports"}/>

                        {/*<ReportMenu.Container>*/}
                        {/*    <ReportMenu.Item icon={Monthly} title={"Monthly Report"}>*/}
                        {/*        <ReportMenu.Item icon={Purchase} title={"Purchase Order"}/>*/}
                        {/*        <ReportMenu.Item icon={Purchase} title={"Purchase Order"}/>*/}
                        {/*        <ReportMenu.Item icon={Purchase} title={"Purchase Order"}/>*/}
                        {/*    </ReportMenu.Item>*/}

                        {/*    <ReportMenu.Item icon={Weekly} title={"Weekly Report"}>*/}
                        {/*        <ReportMenu.Item icon={Purchase} title={"Purchase Order"}/>*/}
                        {/*        <ReportMenu.Item icon={Purchase} title={"Purchase Order"}/>*/}
                        {/*        <ReportMenu.Item icon={Purchase} title={"Purchase Order"}/>*/}
                        {/*    </ReportMenu.Item>*/}

                        {/*</ReportMenu.Container>*/}
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
};

export { AllReportMenuScreen };
