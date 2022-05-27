import React, {Fragment, ReactElement} from 'react';
import {
    IProduct,
    IPurchaseOrderReturn,
    IPurchaseOrderReturnParticulars
} from "@/App/Interfaces/Models";
import View from "@/Components/Base/View";
import {parseDate} from "@/App/Functions/Custom/parseDate.Function";
import {PurchaseOrderReturnProvider} from "@/App/Services/Providers/Modules/Admin";
import {convertToNumber} from "@/App/Functions/Custom";
import {convertToString} from "@/App/Functions/Custom";
import {toaster} from "evergreen-ui";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {
    PurchaseOrderReturnFormScreen,
    PurchaseOrderReturnGridScreen, PurchaseOrderReturnViewScreen
} from "@/Components/Screens/Private/Admin/PurchaseOrderReturn";

export interface IPurchaseOrderReturnViewProps {

}

export interface IPurchaseOrderReturnViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        purchase_order_returns: IPurchaseOrderReturn[],
        filter: {
            search: string,
        }
    }

    form: {
        code: string
        open: boolean,
        uuid: string,
        supplier_uuid: IPurchaseOrderReturn['supplier_uuid'],
        date: IPurchaseOrderReturn['date'] | Date,
        payment_type: IPurchaseOrderReturn['payment_type'],
        total_amount: IPurchaseOrderReturn['total_amount'] | any,
        discount: IPurchaseOrderReturn['discount'] | any,
        vat: IPurchaseOrderReturn['vat'] | any,
        tax: IPurchaseOrderReturn['tax'] | any,
        payable_amount: IPurchaseOrderReturn['payable_amount'] | any,
        received_amount: IPurchaseOrderReturn['received_amount'] | any,
        return_amount: IPurchaseOrderReturn['return_amount'] | any,
        paid_amount: IPurchaseOrderReturn['paid_amount'] | any,
        due_amount: IPurchaseOrderReturn['due_amount'] | any,

        particulars: IPurchaseOrderReturnParticulars[],
    }

    view: {
        open: boolean,
        data: Partial<IPurchaseOrderReturn>
    }

    additional: {}
}
class PurchaseOrderReturnView extends View<IPurchaseOrderReturnViewProps, IPurchaseOrderReturnViewState> {
    constructor(props: IPurchaseOrderReturnViewProps) {
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

                purchase_order_returns: [],
                filter: {
                    search: ''
                }
            },

            form: {
                code: '',
                open: false,
                uuid: '',
                supplier_uuid: '',
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
        this.getPurchaseOrderReturns = this.getPurchaseOrderReturns.bind(this);
        this.calculatePurchaseOrderReturnFormPayments = this.calculatePurchaseOrderReturnFormPayments.bind(this);
        this.generateAndGetParticulars = this.generateAndGetParticulars.bind(this);
        this.savePurchaseOrder = this.savePurchaseOrder.bind(this);
        this.changeParticularData = this.changeParticularData.bind(this);
        this.deleteParticular = this.deleteParticular.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getPurchaseOrderReturns);
    }

    private getPurchaseOrderReturns(): void {
        PurchaseOrderReturnProvider.getProductPurchaseReturnsForGrid(
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
                this.setGridState({purchase_order_returns: data.ListData});
            });
    }

    private calculatePurchaseOrderReturnFormPayments(): void {
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


        payable_amount = (convertToNumber(total_amount) + convertToNumber(vat)) - (convertToNumber(tax) + convertToNumber(discount));

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

        PurchaseOrderReturnProvider.generateAndGetParticulars(product_uuid, (data) => {
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
            this.calculatePurchaseOrderReturnFormPayments();
        });
    }

    private deleteParticular(index: number): void {
        const particulars = [...this.state.form.particulars];
        particulars.splice(index, 1);
        this.setFormState({particulars}, this.calculatePurchaseOrderReturnFormPayments);
    }

    private savePurchaseOrder(): void {
        const {particulars, supplier_uuid, payment_type, payable_amount, paid_amount, received_amount} = this.state.form;

        if (convertToString(supplier_uuid) === "") {
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


        PurchaseOrderReturnProvider.saveProductPurchaseReturn(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getPurchaseOrderReturns();
        });
    }

    public componentDidMount(): void {
        this.getPurchaseOrderReturns();
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
                                    moduleTitle={"Purchase Return List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />

                                <PurchaseOrderReturnGridScreen
                                    formData={this.state.form}
                                    gridData={this.state.grid}
                                    onReload={this.getPurchaseOrderReturns}
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
                                            return_amount: item.return_amount,
                                            supplier_uuid: item.supplier_uuid,
                                            tax: item.tax,
                                            vat: item.vat,
                                        });
                                    }}
                                    onDelete={(uuid) => {
                                        if (window.confirm("Are you sure?")) {
                                            PurchaseOrderReturnProvider.deleteProductPurchaseReturn(uuid, (data) => {
                                                toaster.success(data.message);
                                                this.getPurchaseOrderReturns();
                                            })
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

                                <PurchaseOrderReturnFormScreen
                                    formData={this.state.form}
                                    onFormStateChange={this.setFormState}
                                    onFormSubmit={this.savePurchaseOrder}
                                    onFormClose={this.resetFormState}
                                    onPaymentCalculation={this.calculatePurchaseOrderReturnFormPayments}
                                    onSelectProduct={this.generateAndGetParticulars}
                                    onChangeParticularData={this.changeParticularData}
                                    onDeleteParticular={this.deleteParticular}
                                />

                                <PurchaseOrderReturnViewScreen
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

export default PurchaseOrderReturnView;
