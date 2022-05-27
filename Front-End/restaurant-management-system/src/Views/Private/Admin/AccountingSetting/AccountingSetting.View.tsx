import React, {Fragment, ReactElement} from 'react';
import {IAccountingSettings} from "@/App/Interfaces/Models";
import View from "@/Components/Base/View";
import {AccountingSettingsProvider} from "@/App/Services/Providers/Modules/Admin";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {Button, Checkbox, CogIcon, toaster} from "evergreen-ui";
import {AccountHeadDropdownScreen} from "@/Components/Screens/Private/Admin/AccountHead/AccountHeadDropdown.Screen";
import {Grid} from "@material-ui/core";
import {AccountCategoryDropdownScreen} from "@/Components/Screens/Private/Admin/AccountCategory";
import {css} from "@emotion/css";

export interface IAccountingSettingsViewProps {

}

export interface IAccountingSettingsViewState {
    grid: {
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,


        filter: {
            search: string,
        },
    },
    form: {
        uuid: string,
        auto_accounting_entry: IAccountingSettings['auto_accounting_entry'],
        cash_sales_category_uuid: IAccountingSettings['cash_sales_category_uuid'],
        cash_sales_head_uuid: IAccountingSettings['cash_sales_head_uuid'],
        cash_purchase_category_uuid: IAccountingSettings['cash_purchase_category_uuid'],
        cash_purchase_head_uuid: IAccountingSettings['cash_purchase_head_uuid'],
        customer_payment_category_uuid: IAccountingSettings['customer_payment_category_uuid'],
        customer_payment_head_uuid: IAccountingSettings['customer_payment_head_uuid'],
        supplier_payment_category_uuid: IAccountingSettings['supplier_payment_category_uuid'],
        supplier_payment_head_uuid: IAccountingSettings['supplier_payment_head_uuid'],

    },

    view: {
        data: Partial<IAccountingSettings>,
        open: boolean,
    }

}
class AccountingSettingView extends View<IAccountingSettingsViewProps, IAccountingSettingsViewState> {
    constructor(props:IAccountingSettingsViewProps ) {
        super(props);
        this.initialState = {
            grid: {
                rows_per_page: 10,
                current_page: 0,
                total_pages: 0,
                prev_page: 0,
                next_page: 0,
                first_page: 0,
                last_page: 0,


                filter: {
                    search: "",
                },
            },
            form: {
                uuid: "",
                auto_accounting_entry: false,
                cash_sales_category_uuid: "",
                cash_sales_head_uuid: "",
                cash_purchase_category_uuid: "",
                cash_purchase_head_uuid: "",
                customer_payment_category_uuid: "",
                customer_payment_head_uuid: "",
                supplier_payment_category_uuid: "",
                supplier_payment_head_uuid: "",
            },
            view: {
                data: {},
                open: false,
            },

            additional: {}
        }
        this.state = this.initialState;

        this.saveAccountingSettings = this.saveAccountingSettings.bind(this);
    }

    private getAccountingSettings(): void{
        AccountingSettingsProvider.getAccountingSettingsNoLimit((data) => {
            // console.log(data.cash_purchase_category_uuid);

            if (data != null){
                this.setFormState({
                    cash_sales_category_uuid: data.cash_sales_category_uuid,
                    cash_sales_head_uuid: data.cash_sales_head_uuid,
                    cash_purchase_category_uuid: data.cash_purchase_category_uuid,
                    customer_payment_head_uuid: data.customer_payment_head_uuid,
                    cash_purchase_head_uuid: data.cash_purchase_head_uuid,
                    supplier_payment_category_uuid: data.supplier_payment_category_uuid,
                    supplier_payment_head_uuid: data.supplier_payment_head_uuid,
                    customer_payment_category_uuid: data.customer_payment_category_uuid,
                    auto_accounting_entry: data.auto_accounting_entry,
                    uuid: data.uuid
                });
            }

        })
    }

    private saveAccountingSettings(): void{

        if (this.state.form.cash_sales_category_uuid === '') {
            toaster.danger("Cash Sales Category can not be empty!");
            return;
        }
        if (this.state.form.cash_sales_head_uuid === '') {
            toaster.danger("Cash Sales Head can not be empty!");
            return;
        }
        if (this.state.form.customer_payment_category_uuid === '') {
            toaster.danger("Customer Payment Category can not be empty!");
            return;
        }
        if (this.state.form.customer_payment_head_uuid === '') {
            toaster.danger("Customer Payment Head can not be empty!");
            return;
        }
        if (this.state.form.cash_purchase_category_uuid === '') {
            toaster.danger("Cash Purchase Category can not be empty!");
            return;
        }
        if (this.state.form.cash_purchase_head_uuid === '') {
            toaster.danger("Cash Purchase Head can not be empty!");
            return;
        }
        if (this.state.form.supplier_payment_category_uuid === '') {
            toaster.danger("Supplier Payment Category can not be empty!");
            return;
        }
        if (this.state.form.supplier_payment_head_uuid === '') {
            toaster.danger("Supplier Payment Head can not be empty!");
            return;
        }

        AccountingSettingsProvider.saveAccountingSetting(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getAccountingSettings();

        });

    }

    componentDidMount(): void {
        this.getAccountingSettings();
    }

    render(): ReactElement {
        return (
            <Fragment>
                <MainLayout>
                    <SideBarScreen/>
                    <div className="wrapper" style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                        <HeaderScreen/>
                        <div className={MainContainerStyleSheet.classes.root}>
                            <div className={"main-container"} style={{paddingTop: '10px'}}>
                                <ModuleTitleScreen
                                    moduleTitle={"Accounting Settings"}

                                />

                                <Grid container spacing={3}>
                                    <Grid item sm={12} lg={12} xs={12}>
                                        <span>Auto Accounting Entry</span>
                                        <Checkbox label="Enable" checked={this.state.form.auto_accounting_entry} onChange={() => this.setFormState({auto_accounting_entry: !this.state.form.auto_accounting_entry})} />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={12}>
                                        <div className={css`border: solid #718096; padding: 20px; margin: 10px;`}>
                                            <div style={{color: "#101840", fontSize: 22, fontWeight: 500, paddingBottom: 20,}}>Cash Sales Account <abbr style={{color: "red"}}>*</abbr></div>
                                            <Grid container spacing={3}>
                                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, }}>Category</div>
                                                    <AccountCategoryDropdownScreen
                                                        type={"Income"}
                                                        width={"100%"}
                                                        uuid={this.state.form.cash_sales_category_uuid}
                                                        onChange={(uuid, label) => this.setFormState({
                                                            cash_sales_category_uuid: uuid,
                                                        })}
                                                    />
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, }}>Heads</div>
                                                    <AccountHeadDropdownScreen
                                                        type={"Income"}
                                                        width={'100%'}
                                                        uuid={this.state.form.cash_sales_head_uuid}
                                                        onChange={(uuid, label) => this.setFormState({
                                                            cash_sales_head_uuid: uuid,
                                                        })}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className={css`border: solid #718096; padding: 20px; margin: 10px;`}>
                                            <div style={{color: "#101840", fontSize: 22, fontWeight: 500, paddingBottom: 20,}}>Customer Payment Account <abbr style={{color: "red"}}>*</abbr></div>
                                            <Grid container spacing={3}>
                                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500,}}>Category</div>
                                                    <AccountCategoryDropdownScreen
                                                        type={"Income"}
                                                        width={"100%"}
                                                        uuid={this.state.form.customer_payment_category_uuid}
                                                        onChange={(uuid, label) => this.setFormState({
                                                            customer_payment_category_uuid: uuid,
                                                        })}
                                                    />
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, }}>Heads</div>
                                                    <AccountHeadDropdownScreen
                                                        type={"Income"}
                                                        width={'100%'}
                                                        uuid={this.state.form.customer_payment_head_uuid}
                                                        onChange={(uuid, label) => this.setFormState({
                                                            customer_payment_head_uuid: uuid,
                                                        })}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>

                                    <Grid item lg={6} md={6} sm={6} xs={12}>
                                        <div className={css`border: solid #718096; padding: 20px; margin: 10px;`}>
                                            <div style={{color: "#101840", fontSize: 22, fontWeight: 500, paddingBottom: 20,}}>Cash Purchase Account <abbr style={{color: "red"}}>*</abbr></div>
                                            <Grid container spacing={3}>
                                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, }}>Category</div>
                                                    <AccountCategoryDropdownScreen
                                                        type={"Expense"}
                                                        width={"100%"}
                                                        uuid={this.state.form.cash_purchase_category_uuid}
                                                        onChange={(uuid, label) => this.setFormState({
                                                            cash_purchase_category_uuid: uuid,
                                                        })}
                                                    />
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, }}>Heads</div>
                                                    <AccountHeadDropdownScreen
                                                        type={"Expense"}
                                                        width={'100%'}
                                                        uuid={this.state.form.cash_purchase_head_uuid}
                                                        onChange={(uuid, label) => this.setFormState({
                                                            cash_purchase_head_uuid: uuid,
                                                        })}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className={css`border: solid #718096; padding: 20px; margin: 10px;`}>
                                            <div style={{color: "#101840", fontSize: 22, fontWeight: 500, paddingBottom: 20 }}>Supplier Payment Account <abbr style={{color: "red"}}>*</abbr></div>
                                            <Grid container spacing={3}>
                                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, }}>Category</div>
                                                    <AccountCategoryDropdownScreen
                                                        type={"Expense"}
                                                        width={"100%"}
                                                        uuid={this.state.form.supplier_payment_category_uuid}
                                                        onChange={(uuid, label) => this.setFormState({
                                                            supplier_payment_category_uuid: uuid,
                                                        })}
                                                    />
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, }}>Heads</div>
                                                    <AccountHeadDropdownScreen
                                                        type={"Expense"}
                                                        width={'100%'}
                                                        uuid={this.state.form.supplier_payment_head_uuid}
                                                        onChange={(uuid, label) => this.setFormState({
                                                            supplier_payment_head_uuid: uuid,
                                                        })}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>

                                    <Grid item lg={12} xs={12} md={12} >
                                        <Button  marginY={8}  iconAfter={CogIcon} appearance="primary" intent="success" onClick={this.saveAccountingSettings}>
                                            Update Setting
                                        </Button>
                                    </Grid>

                                </Grid>
                            </div>

                        </div>

                    </div>

                </MainLayout>
            </Fragment>
        );
    }
}

export default AccountingSettingView;
