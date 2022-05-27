import React, {Fragment, ReactElement} from 'react';
import {ISupplier, ISupplierPayment} from "@/App/Interfaces/Models";
import View from "@/Components/Base/View";
import {parseDate} from "@/App/Functions/Custom/parseDate.Function";
import {SupplierPaymentProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import {convertToNumber} from "@/App/Functions/Custom/convertToNumber.Function";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {
    SupplierPaymentFormScreen,
    SupplierPaymentGridScreen,
    SupplierPaymentViewScreen
} from "@/Components/Screens/Private/Admin/SupplierPayment";

export interface ISupplierPaymentViewProps {

}

export interface ISupplierPaymentViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        supplier_payments: ISupplierPayment[],

        filter: {
            search: string,
        }
    },
    form: {
        is_edit: boolean,
        is_uploading: boolean,
        code: ISupplierPayment['code'],
        open: boolean,
        uuid: ISupplierPayment['uuid'],
        supplier_uuid: ISupplierPayment['supplier_uuid'],
        date: ISupplierPayment['date'],
        paid_amount: ISupplierPayment['paid_amount'],
        note: ISupplierPayment['note'],
        is_featured: boolean,
        supplier_due: number | string,
    },
    view: {
        open: boolean,
        data: Partial<ISupplierPayment>
    },
    additional: {}
}
class SupplierPaymentView extends View<ISupplierPaymentViewProps, ISupplierPaymentViewState> {
    constructor(props: ISupplierPaymentViewProps) {
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

                supplier_payments: [],
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
                supplier_uuid: '',
                paid_amount: 0,
                note: '',
                date: parseDate(new Date()),
                is_featured: false,
                supplier_due: 0,
            },

            view: {
                open: false,
                data: {}
            },

            additional: {}
        };

        this.state = this.initialState;

        this.getSupplierPayments = this.getSupplierPayments.bind(this);
        this.getSupplierDue = this.getSupplierDue.bind(this);
        this.saveSupplierPayment = this.saveSupplierPayment.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getSupplierPayments);
    }

    private getSupplierPayments(): void {
        SupplierPaymentProvider.getSupplierPaymentsForGrid(
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
                this.setGridState({supplier_payments: data.ListData});
            });
    }

    private saveSupplierPayment(): void {
        if (this.state.form.paid_amount === 0) {
            toaster.danger("Paid Amount can not be empty!");
            return;
        }


        SupplierPaymentProvider.saveSupplierPayment(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getSupplierPayments();
        });
    }

    private getSupplierDue(customer_uuid: ISupplier['uuid']): void {
        SupplierPaymentProvider.getSupplierDue(customer_uuid, (data) => {
            this.setFormState({
                supplier_due: convertToNumber(data.due),
            });
        });
    }


    public componentDidMount(): void {
        this.getSupplierPayments();
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
                                    moduleTitle={"Supplier Payment List"}

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
                                    <SupplierPaymentGridScreen
                                        gridData={this.state.grid}
                                        formData={this.state.form}
                                        onReload={this.getSupplierPayments}
                                        onView={(data) => this.setViewState({
                                            open: true,
                                            data,
                                        })}
                                        onDelete={(uuid) => {
                                            if (window.confirm("Are you sure?")) {
                                                SupplierPaymentProvider.deleteSupplierPayment(uuid, (data) => {
                                                    toaster.success(data.message);
                                                    this.getSupplierPayments();
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
                                                supplier_due: item.prev_due_amount,
                                                supplier_uuid: item.supplier_uuid,
                                            });
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

                    <SupplierPaymentFormScreen
                        formData={this.state.form}
                        onFormStateChange={this.setFormState}
                        onFormSubmit={this.saveSupplierPayment}
                        onFormClose={this.resetFormState}
                        SupplierDue={this.getSupplierDue}
                    />

                    <SupplierPaymentViewScreen
                        viewData={this.state.view}
                        onViewClose={this.resetViewState}
                    />

                </MainLayout>

            </Fragment>
        );
    }
}


export default SupplierPaymentView;
