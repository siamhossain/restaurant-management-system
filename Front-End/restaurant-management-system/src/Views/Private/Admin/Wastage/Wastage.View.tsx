import React, {Fragment, ReactElement} from 'react';
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import View from "@/Components/Base/View";
import {WastageFormScreen, WastageGridScreen, WastageViewScreen} from "@/Components/Screens/Private/Admin/Wastage";
import {WastageProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import {IProduct, IWastage, IWastageParticulars} from "@/App/Interfaces/Models";
import {convertToNumber, convertToString, parseDate} from "@/App/Functions/Custom";

export interface IWastageViewProps {

}

export interface IWastageViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        wastages: IWastage[],
        filter: {
            search: string,
        }
    }

    form: {
        code: string
        open: boolean,
        uuid: string,
        date: IWastage['date'],
        total_amount: IWastage['total_amount'] | any,
        particulars: IWastageParticulars[],
    }

    view: {
        open: boolean,
        data: Partial<IWastage>
    }

    additional: {}
}
class WastageView extends View<IWastageViewProps, IWastageViewState> {
    constructor(props: IWastageViewProps) {
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

                wastages: [],
                filter: {
                    search: ''
                }
            },

            form: {
                code: '',
                open: false,
                uuid: '',
                total_amount: 0,
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
        this.getWastages = this.getWastages.bind(this);
        this.calculateWastageFormPayments = this.calculateWastageFormPayments.bind(this);
        this.generateAndGetParticulars = this.generateAndGetParticulars.bind(this);
        this.saveWastage = this.saveWastage.bind(this);
        this.changeParticularData = this.changeParticularData.bind(this);
        this.deleteParticular = this.deleteParticular.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getWastages);
    }

    private getWastages(): void {
        WastageProvider.getWastagesForGrid(
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
                this.setGridState({wastages: data.ListData});
            });
    }

    private calculateWastageFormPayments(): void {
        const formData = this.state.form;
        let {total_amount} = formData;

        const particulars = [...this.state.form.particulars];
        let particular_total_amount = 0;

        for (let i = 0; i < particulars.length; i++) {
            const particular = particulars[i];
            particular.total_amount = convertToNumber(particular.unit_price) * convertToNumber(particular.qty);

            particular_total_amount += particular.total_amount;
        }

        total_amount = particular_total_amount;

        this.setFormState({
            total_amount,
        });
    }

    private generateAndGetParticulars(product_uuid: IProduct['uuid']): void {
        const particulars = [...this.state.form.particulars];

        const particularIndex = particulars.findIndex(particular => convertToString(particular.product_uuid) === convertToString(product_uuid));
        if (particularIndex > -1) {
            toaster.danger("This product has been taken!");
            return;
        }

        WastageProvider.generateAndGetParticulars(product_uuid, (data) => {
            this.setFormState({
                particulars: particulars.concat(data),
            });
        });
    }

    private changeParticularData(data: {
        index: number,
        key: 'qty' | 'unit_price',
        value: any,
    }, callback: (() => void) | undefined = undefined): void {

        const particulars = [...this.state.form.particulars];
        particulars[data.index][data.key] = data.value;

        this.setFormState({
            particulars,
        }, () => {
            if (callback) {
                callback()
            }
            this.calculateWastageFormPayments();
        });
    }

    private deleteParticular(index: number): void {
        const particulars = [...this.state.form.particulars];
        particulars.splice(index, 1);
        this.setFormState({particulars}, this.calculateWastageFormPayments);
    }

    private saveWastage(): void {
        WastageProvider.saveWastage(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getWastages();
        });
    }

    public componentDidMount(): void {
        this.getWastages();
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
                                    moduleTitle={"Wastage List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />

                                <WastageGridScreen
                                    formData={this.state.form}
                                    gridData={this.state.grid}
                                    onReload={this.getWastages}
                                    onView={(data) => this.setViewState({
                                        open: true,
                                        data,
                                    })}
                                    onEdit={(wastage) => {
                                        console.log(wastage);
                                        this.setFormState({
                                            open: true,
                                            uuid: wastage.uuid,
                                            total_amount: wastage.total_amount,
                                            date: wastage.date,
                                            code: wastage.code,
                                            particulars: wastage.particulars,
                                        });
                                    }}
                                    onDelete={(uuid) => {
                                        if (window.confirm("Are you sure?")) {
                                            WastageProvider.deleteWastage(uuid, (data) => {
                                                toaster.success(data.message);
                                                this.getWastages();
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

                                <WastageFormScreen
                                    formData={this.state.form}
                                    onFormStateChange={this.setFormState}
                                    onFormSubmit={this.saveWastage}
                                    onFormClose={this.resetFormState}
                                    onPaymentCalculation={this.calculateWastageFormPayments}
                                    onSelectProduct={this.generateAndGetParticulars}
                                    onChangeParticularData={this.changeParticularData}
                                    onDeleteParticular={this.deleteParticular}
                                />

                                <WastageViewScreen
                                    viewData={this.state.view}
                                    onViewClose={this.resetViewState}
                                />
                            </div>
                        </div>

                    </div>
                </MainLayout>

            </Fragment>
        );
    }
}

export default WastageView;
