import React, {Fragment, ReactElement} from 'react';
import {ICustomer, ICustomerPayment} from "@/App/Interfaces/Models";
import {CustomerPaymentProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {CustomerViewScreen} from "@/Components/Screens/Private/Admin/Customer";
import View from "@/Components/Base/View";
import {parseDate} from "@/App/Functions/Custom/parseDate.Function";
import {
    CustomerPaymentFormScreen,
    CustomerPaymentGridScreen,
    CustomerPaymentViewScreen
} from "@/Components/Screens/Private/Admin/CustomerPayment";
import {convertToNumber, convertToString} from "@/App/Functions/Custom";

export interface ICustomerPaymentViewProps {

}

export interface ICustomerPaymentViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        customer_payments: ICustomerPayment[],

        filter: {
            search: string,
        }
    },
    form: {
        is_edit: boolean,
        is_uploading: boolean,
        code: ICustomerPayment['code'],
        open: boolean,
        uuid: ICustomerPayment['uuid'],
        customer_uuid: ICustomerPayment['customer_uuid'],
        date: ICustomerPayment['date'],
        paid_amount: ICustomerPayment['paid_amount'],
        note: ICustomerPayment['note'],
        is_featured: boolean,
        status: "Active" | "Inactive" | "Banned" | "Pending",
        customer_due: number | string,
    },
    view: {
        open: boolean,
        data: Partial<ICustomerPayment>
    },
    additional: {}
}
class CustomerPaymentView extends View<ICustomerPaymentViewProps, ICustomerPaymentViewState> {
    constructor(props: ICustomerPaymentViewProps) {
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

                customer_payments: [],
                filter: {
                    search: "",
                },
            },
            form: {
                is_edit: false,
                is_uploading: false,
                open: false,
                code: '',
                uuid: '',
                customer_uuid: '',
                paid_amount: 0,
                note: '',
                date: parseDate(new Date()),
                is_featured: false,
                status: "Active",
                customer_due: 0,
            },

            view: {
                open: false,
                data: {}
            },

            additional: {}
        };

        this.state = this.initialState;

        this.getCustomerPayments = this.getCustomerPayments.bind(this);
        this.getCustomerDue = this.getCustomerDue.bind(this);
        this.saveCustomerPayment = this.saveCustomerPayment.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getCustomerPayments);
    }

    private getCustomerPayments(): void {
        CustomerPaymentProvider.getCustomerPaymentsForGrid(
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

                console.log(data);
                this.setGridState({customer_payments: data.ListData});
            });
    }

    private saveCustomerPayment(): void {
        if (this.state.form.paid_amount === 0) {
            toaster.danger("Receive amount can not be empty!");
            return;
        }

        CustomerPaymentProvider.saveCustomerPayment(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getCustomerPayments();
        });
    }

    private getCustomerDue(customer_uuid: ICustomer['uuid']): void {
        CustomerPaymentProvider.getCustomerDue(customer_uuid, (data) => {
            this.setFormState({
                customer_due: convertToNumber(data.due),
            })
        });
    }


    public componentDidMount(): void {
        this.getCustomerPayments();
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
                                    moduleTitle={"Customer Payment List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />

                                <div style={{padding: '0 30px'}}>
                                    <CustomerPaymentGridScreen
                                        gridData={this.state.grid}
                                        formData={this.state.form}
                                        onReload={this.getCustomerPayments}
                                        onView={(data) => this.setViewState({
                                            open: true,
                                            data,
                                        })}
                                        onDelete={(uuid) => {
                                            if (window.confirm("Are you sure?")) {
                                                CustomerPaymentProvider.deleteCustomerPayment(uuid, (data) => {
                                                    toaster.success(data.message);
                                                    this.getCustomerPayments();
                                                })
                                            }
                                        }}
                                        onEdit={(item) => {
                                            this.setFormState({
                                                uuid: item.uuid,
                                                is_edit: true,
                                                open: true,
                                                date: item.date,
                                                paid_amount: item.paid_amount,
                                                note: item.note,
                                                customer_due: item.customer_due,
                                                customer_uuid: item.customer_uuid,

                                            }, () => {this.getCustomerDue(item.customer_uuid)})
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
                                </div>
                            </div>
                        </div>

                    </div>

                    <CustomerPaymentFormScreen
                        formData={this.state.form}
                        onFormStateChange={this.setFormState}
                        onFormSubmit={this.saveCustomerPayment}
                        onFormClose={this.resetFormState}
                        CustomerDue={this.getCustomerDue}
                    />

                    <CustomerPaymentViewScreen
                        viewData={this.state.view}
                        onViewClose={this.resetViewState}
                    />



                </MainLayout>

            </Fragment>
        );
    }
}

export default CustomerPaymentView;
