import React, {Fragment, ReactElement, useEffect} from 'react';
import Banner1 from "@/Static/Images/StoreFront/PlutoKitchen/Dashboard/banner1.jpg";
import {DashboardBannerStyleSheet} from "@/Static/StyleSheets/Admin/DashboardBanner";
import Income from "@/Static/Images/StoreFront/PlutoKitchen/Dashboard/DashboardResource/img_card_income.png";
import Expense from "@/Static/Images/StoreFront/PlutoKitchen/Dashboard/DashboardResource/img_expense.png";
import Customers from "@/Static/Images/StoreFront/PlutoKitchen/Dashboard/DashboardResource/ic_customers.png";
import Suppliers from "@/Static/Images/StoreFront/PlutoKitchen/Dashboard/DashboardResource/ic_suppliers.png";
import Items from "@/Static/Images/StoreFront/PlutoKitchen/Dashboard/DashboardResource/img_items.png";
import Sales from "@/Static/Images/StoreFront/PlutoKitchen/Dashboard/DashboardResource/ic_sales.png";
import {ResourceCounterCardScreen} from "@/Components/Screens/Private/Admin/ResourceCounter";
import Grid from "@material-ui/core/Grid";
import {DashboardProvider} from "@/App/Services/Providers/Modules/Admin";
import View from "@/Components/Base/View";
import {convertToNumber} from "@/App/Functions/Custom";

export interface IDashboardBannerScreenProps {

}

export interface IDashboardBannerScreenState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,
    },
    form : {
        total_product: number,
        total_customer: number,
        total_supplier: number,
        total_salesItem: number,
        total_income: number,
        total_expense: number,
    },
    view: {},
    additional: {},
}
class DashboardBannerScreen extends View<IDashboardBannerScreenProps, IDashboardBannerScreenState> {
    constructor(props:IDashboardBannerScreenProps) {
        super(props);
        this.initialState = {
            grid: {
                dialog_open: false,
                rows_per_page: 10,
                current_page: 1,
                total_pages: 0,
                prev_page: 0,
                next_page: 0,
                first_page: 0,
                last_page: 0,

                filter: {
                    search: ''
                }
            },
           form: {
               total_product: 0,
               total_customer: 0,
               total_supplier: 0,
               total_salesItem: 0,
               total_income: 0,
               total_expense: 0,
           },

           view: {},
            additional: {},
        }

        this.state = this.initialState;
        this.getDashboardData = this.getDashboardData.bind(this);
    }

    private getDashboardData() {
        DashboardProvider.getDashboardSummary((data) => {
            this.setFormState({
                total_product: data.total_product,
                total_customer: data.total_customer,
                total_supplier: data.total_supplier,
                total_salesItem: data.total_salesItem,
                total_income: data.total_income,
                total_expense: data.total_expense,
            })
        })
    }

    componentDidMount(): void {
        this.getDashboardData();
    }

    render(): ReactElement {
        return (
            <Fragment>

                <div className={DashboardBannerStyleSheet.classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                            <div className="main-blog" style={{background: `url(${Banner1})`, height: "351px"}}>
                                <div className="main-blog__title">
                                    Good food never fail in bringing people together.
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                            <div className="resource-counter-section" style={{
                                background: "#000",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <div className="dash-card">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                            <ResourceCounterCardScreen
                                                icon={Items} title={"Items"}
                                                counter={convertToNumber(this.state.form.total_product)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                            <ResourceCounterCardScreen
                                                icon={Suppliers} title={"Suppliers"}
                                                counter={convertToNumber(this.state.form.total_supplier)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                            <ResourceCounterCardScreen
                                                icon={Customers} title={"Customers"}
                                                counter={convertToNumber(this.state.form.total_customer)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                            <ResourceCounterCardScreen
                                                icon={Sales} title={"Sales"}
                                                counter={convertToNumber(this.state.form.total_salesItem)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                            <ResourceCounterCardScreen
                                                icon={Income} title={"Income"}
                                                counter={convertToNumber(this.state.form.total_income)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                            <ResourceCounterCardScreen
                                                icon={Expense} title={"Expense"}
                                                counter={convertToNumber(this.state.form.total_expense)}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        );
    }
}

export { DashboardBannerScreen };
