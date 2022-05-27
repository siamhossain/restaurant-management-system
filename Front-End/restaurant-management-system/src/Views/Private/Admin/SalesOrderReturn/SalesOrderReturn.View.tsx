import React, {Fragment, ReactElement} from 'react';
import {IProduct, ISalesOrderReturn, ISalesOrderReturnParticulars} from "@/App/Interfaces/Models";
import {parseDate} from "@/App/Functions/Custom/parseDate.Function";
import {
    SalesOrderProvider,
    SalesOrderReturnProvider
} from "@/App/Services/Providers/Modules/Admin";
import {convertToNumber} from "@/App/Functions/Custom";
import {convertToString} from "@/App/Functions/Custom";
import {toaster} from "evergreen-ui";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import View from "@/Components/Base/View";
import {
    SalesOrderReturnFormScreen,
    SalesOrderReturnGridScreen, SalesOrderReturnViewScreen
} from "@/Components/Screens/Private/Admin/SalesOrderReturn";

export interface ISalesOrderReturnViewProps {

}

export interface ISalesOrderReturnViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        sales_order_returns: ISalesOrderReturn[],
        filter: {
            search: string,
        }
    }

    form: {
        code: string
        open: boolean,
        uuid: string,
        customer_uuid: ISalesOrderReturn['customer_uuid'],
        date: ISalesOrderReturn['date'] | Date,
        payment_type: ISalesOrderReturn['payment_type'],
        total_amount: ISalesOrderReturn['total_amount'] | any,
        discount: ISalesOrderReturn['discount'] | any,
        vat: ISalesOrderReturn['vat'] | any,
        tax: ISalesOrderReturn['tax'] | any,
        payable_amount: ISalesOrderReturn['payable_amount'] | any,
        received_amount: ISalesOrderReturn['received_amount'] | any,
        return_amount: ISalesOrderReturn['return_amount'] | any,
        paid_amount: ISalesOrderReturn['paid_amount'] | any,
        due_amount: ISalesOrderReturn['due_amount'] | any,

        particulars: ISalesOrderReturnParticulars[],
    }

    view: {
        open: boolean,
        data: Partial<ISalesOrderReturn>
    }

    additional: {}
}
class SalesOrderReturnView extends View<ISalesOrderReturnViewProps, ISalesOrderReturnViewState> {
    constructor(props: ISalesOrderReturnViewProps) {
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

                sales_order_returns: [],
                filter: {
                    search: ''
                }
            },

            form: {
                code: '',
                open: false,
                uuid: '',
                customer_uuid: '',
                payment_type: 'Cash',
                total_amount: 0,
                discount: 0,
                vat: 0,
                tax: 0,
                payable_amount: 0,
                received_amount: 0,
                return_amount: 0,
                paid_amount: 0,
                due_amount: 0,
                date: parseDate(new Date()),

                particulars: [],
            },

            view: {
                data: {},
                open: false,
            },

            additional: {}
        };

        this.state = this.initialState;
        this.getSalesOrderReturns = this.getSalesOrderReturns.bind(this);
        this.calculateSalesOrderFormPayments = this.calculateSalesOrderFormPayments.bind(this);
        this.generateAndGetParticulars = this.generateAndGetParticulars.bind(this);
        this.saveSalesOrderReturn = this.saveSalesOrderReturn.bind(this);
        this.changeParticularData = this.changeParticularData.bind(this);
        this.deleteParticular = this.deleteParticular.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getSalesOrderReturns);
    }

    private getSalesOrderReturns(): void {
        SalesOrderReturnProvider.getSalesOrderReturnsForGrid(
            this.state.grid.rows_per_page,
            this.state.grid.current_page,
            this.state.grid.filter.search,
            (data) => {
                this.setPaginationData(
                    data.TotalPages,
                    data.PrevPage,
                    data.NextPage,
                    data.LastPage,
                )
                this.setGridState({sales_order_returns: data.ListData});
            });
    }

    private calculateSalesOrderFormPayments(): void {
        const formData = this.state.form;
        let {discount, tax, return_amount, received_amount, payable_amount, due_amount, paid_amount, total_amount, vat, payment_type} = formData;

        const particulars = [...this.state.form.particulars];
        let particular_total_amount = 0;

        for (let i = 0; i < particulars.length; i++) {
            const particular = particulars[i];
            particular.total_price = convertToNumber(particular.unit_price) * convertToNumber(particular.quantity);

            particular_total_amount += particular.total_price;
        }

        total_amount = particular_total_amount;


        payable_amount = (convertToNumber(total_amount) + convertToNumber(vat) + convertToNumber(tax)) -  convertToNumber(discount);

        if (payment_type === "Cash") {
            paid_amount = 0;
            due_amount = 0;

            if (convertToNumber(received_amount) > convertToNumber(payable_amount)) {
                return_amount = convertToNumber(received_amount) - convertToNumber(payable_amount);
            } else {
                return_amount = 0;
            }

        } else if (payment_type === "Credit") {
            received_amount = 0;
            return_amount = 0;

            if (convertToNumber(payable_amount) > convertToNumber(paid_amount)) {
                due_amount = convertToNumber(payable_amount) - convertToNumber(paid_amount);
            } else {
                due_amount = 0;
            }

            if (convertToNumber(paid_amount) === convertToNumber(payable_amount)) {
                payment_type = "Cash";
                received_amount = paid_amount;
                return_amount = 0;
                paid_amount = 0;
                due_amount = 0;
            }
        }


        if (total_amount === 0 || payable_amount === 0) {
            received_amount = 0;
            return_amount = 0;
            paid_amount = 0;
            due_amount = 0;
            discount = 0;
            tax = 0;
            payable_amount = 0;
        }


        this.setFormState({
            payment_type,
            total_amount,
            payable_amount,
            received_amount,
            return_amount,
            paid_amount,
            due_amount,
            discount,
            tax,
        });
    }

    private generateAndGetParticulars(product_uuid: IProduct['uuid']): void {
        const particulars = [...this.state.form.particulars];

        const particularIndex = particulars.findIndex(particular => convertToString(particular.product_uuid) === convertToString(product_uuid));
        if (particularIndex > -1) {
            toaster.danger("This product has been taken!");
            return;
        }

        SalesOrderReturnProvider.generateAndGetParticulars(product_uuid, (data) => {
            this.setFormState({
                particulars: particulars.concat(data),
            });
        });
    }

    private changeParticularData(data: {
        index: number,
        key: 'quantity' | 'unit_price',
        value: never,
    }, callback: (() => void) | undefined = undefined): void {

        const particulars = [...this.state.form.particulars];
        particulars[data.index][data.key] = data.value;

        this.setFormState({
            particulars,
        }, () => {
            if (callback) {
                callback()
            }
            this.calculateSalesOrderFormPayments();
        });
    }

    private deleteParticular(index: number): void {
        const particulars = [...this.state.form.particulars];
        particulars.splice(index, 1);
        this.setFormState({particulars}, this.calculateSalesOrderFormPayments);
    }

    private saveSalesOrderReturn(): void {
        const {particulars, customer_uuid, payment_type, payable_amount, paid_amount, received_amount} = this.state.form;

        if (convertToString(customer_uuid) === "") {
            toaster.danger("Please select a supplier!");
            return;
        }

        if (particulars.length === 0) {
            toaster.danger("Please add some items!");
            return;
        }

        if (payment_type === "Cash") {
            if (convertToNumber(received_amount) < convertToNumber(payable_amount)) {
                toaster.danger("Received amount can not be less than the payment amount!");
                return;
            }
        }

        if (payment_type === "Credit") {
            if (convertToNumber(paid_amount) > convertToNumber(payable_amount)) {
                toaster.danger("Paid amount can not be greater than the payment amount!");
                return;
            }
        }


        SalesOrderReturnProvider.saveSalesOrderReturn(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getSalesOrderReturns();
        });
    }

    public componentDidMount(): void {
        this.getSalesOrderReturns();
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
                                    moduleTitle={"Sales Order Return List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />

                                <SalesOrderReturnGridScreen
                                    formData={this.state.form}
                                    gridData={this.state.grid}
                                    onReload={this.getSalesOrderReturns}
                                    onView={(data) => {
                                        this.setViewState({
                                            open: true,
                                            data,
                                        });
                                        console.log(data)
                                    }}

                                    onEdit={(item) => {
                                        this.setFormState({
                                            open: true,
                                            date: item.date,
                                            payable_amount: item.payable_amount,
                                            total_amount: item.total_amount,
                                            uuid: item.uuid,
                                            discount: item.discount,
                                            due_amount: item.due_amount,
                                            paid_amount: item.paid_amount,
                                            particulars: item.particulars,
                                            payment_type: item.payment_type,
                                            received_amount: item.received_amount,
                                            return_amount: item.received_amount,
                                            customer_uuid: item.customer_uuid,
                                            tax: item.tax,
                                            vat: item.vat,
                                        });
                                    }}
                                    onDelete={(uuid) => {
                                        if (window.confirm("Are you sure?")) {
                                            SalesOrderReturnProvider.deleteSalesOrderReturn(uuid, (data) => {
                                                toaster.success(data.message);
                                                this.getSalesOrderReturns();
                                            });
                                        }
                                    }}
                                    onChangeGridData={this.setGridState}
                                    onChangeFilter={this.setGridFilterState}
                                    onNavigateToPageNumber={this.paginateController}
                                    onNavigateToFirstPage={this.navigateToFirstPage}
                                    onNavigateToPrevPage={this.navigateToPrevPage}
                                    onNavigateToNextPage={this.navigateToNextPage}
                                    onNavigateToLastPage={this.navigateToLastPage}
                                    pageNavigationDisabled={this.pageNavigationDisabled}
                                    onFormClose={this.resetFormState}
                                />
                                <SalesOrderReturnFormScreen
                                    formData={this.state.form}
                                    onFormStateChange={this.setFormState}
                                    onFormSubmit={this.saveSalesOrderReturn}
                                    onFormClose={this.resetFormState}
                                    onPaymentCalculation={this.calculateSalesOrderFormPayments}
                                    onSelectProduct={this.generateAndGetParticulars}
                                    onChangeParticularData={this.changeParticularData}
                                    onDeleteParticular={this.deleteParticular}
                                />
                                <SalesOrderReturnViewScreen
                                    onViewClose={this.resetViewState}
                                    viewData={this.state.view}
                                />
                            </div>
                        </div>

                    </div>

                </MainLayout>
            </Fragment>
        );
    }
}

export default SalesOrderReturnView;
