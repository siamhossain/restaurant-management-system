import React, {Fragment, ReactElement} from 'react';
import View from "@/Components/Base/View";
import {IDueInvoice} from "@/App/Interfaces/Models";
import {parseDate} from "@/App/Functions/Custom";
import {BrandProvider, DueInvoiceProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {
    DueInvoiceFormScreen,
    DueInvoiceGridScreen,
    DueInvoiceViewScreen
} from "@/Components/Screens/Private/Admin/DueInvoice";

export interface IDueInvoiceViewProps {

}

export interface IDueInvoiceViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        due_invoice: IDueInvoice[],
        filter: {
            search: string,
            participant_type: IDueInvoice['participant_type'],
        }
    }

    form: {
        edit_mode: boolean,
        code: string
        open: boolean,
        uuid: string,
        date: IDueInvoice['date'] | any,
        participant_type: IDueInvoice['participant_type'],
        participant_uuid: IDueInvoice['participant_uuid'],
        amount: IDueInvoice['amount'],
        comment: IDueInvoice['comment'],
    }

    view: {
        open: boolean,
        data: Partial<IDueInvoice>
    }

    additional: {}
}
class DueInvoiceView extends View<IDueInvoiceViewProps, IDueInvoiceViewState> {
    constructor(props: IDueInvoiceViewProps) {
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

                due_invoice: [],
                filter: {
                    search: '',
                    participant_type: '',
                }
            },

            form: {
                edit_mode: false,
                code: '',
                open: false,
                uuid: '',
                date: parseDate(new Date()),
                participant_type: '',
                participant_uuid: '',
                amount: 0,
                comment: '',

            },

            view: {
                data: {},
                open: false,
            },

            additional: {}
        }

        this.state = this.initialState;
        this.getDueInvoice = this.getDueInvoice.bind(this);
        this.saveDueInvoice = this.saveDueInvoice.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getDueInvoice);
    }

    private getDueInvoice(): void {
        DueInvoiceProvider.getDuesForGrid(
            this.state.grid.rows_per_page,
            this.state.grid.current_page,
            this.state.grid.filter.search,
            this.state.grid.filter.participant_type,
            (data) => {
                this.setPaginationData(
                    data.TotalPages,
                    data.PrevPage,
                    data.NextPage,
                    data.LastPage,
                )
                this.setGridState({due_invoice: data.ListData});
            });
    }

    private saveDueInvoice(): void {
        if (this.state.form.participant_type === '') {
            toaster.danger('Select Participant Type First!');
            return;
        }

        if (this.state.form.participant_uuid === '') {
            toaster.danger('Select Participant First!');
            return;
        }
        if (this.state.form.amount === 0) {
            toaster.danger('Amount can not be empty!');
            return;
        }

        DueInvoiceProvider.saveDue(this.state.form, (data) => {
            toaster.success(data.message);
            this.getDueInvoice();
            this.resetFormState();
        })
    }

    componentDidMount(): void {
        this.getDueInvoice();
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
                                    moduleTitle={"Due List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />
                                <DueInvoiceGridScreen
                                    gridData={this.state.grid}
                                    formData={this.state.form}
                                    onReload={this.getDueInvoice}
                                    onView={(data) => this.setViewState({
                                        open: true,
                                        data,
                                    })}
                                    onDelete={(uuid) => {
                                        if (window.confirm("Are you sure?")) {
                                            DueInvoiceProvider.deleteDue(uuid, (data) => {
                                                toaster.success(data.message);
                                                this.getDueInvoice();
                                            })
                                        }
                                    }}
                                    onEdit={(item) => {
                                        this.setFormState({
                                            uuid: item.uuid,
                                            open: true,
                                            date: item.date,
                                            amount: item.amount,
                                            comment: item.comment,
                                            participant_type: item.participant_type,
                                            participant_uuid: item.participant_uuid,
                                        })
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

                                <DueInvoiceFormScreen
                                    formData={this.state.form}
                                    gridData={this.state.grid}
                                    onFormStateChange={this.setFormState}
                                    onFormSubmit={this.saveDueInvoice}
                                    onFormClose={this.resetFormState}
                                />

                                <DueInvoiceViewScreen
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

export default DueInvoiceView;
