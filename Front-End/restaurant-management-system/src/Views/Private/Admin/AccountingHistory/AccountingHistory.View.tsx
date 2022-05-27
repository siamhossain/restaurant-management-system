import React, {Fragment, ReactElement} from 'react';
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import View from "@/Components/Base/View";
import {
    AccountingHistoryFormScreen,
    AccountingHistoryGridScreen
} from "@/Components/Screens/Private/Admin/AccountingHistory";
import {IAccountCategory, IAccountHead, IAccountingHistory} from "@/App/Interfaces/Models";
import {toaster} from "evergreen-ui";
import {AccountHeadProvider, AccountingHistoryProvider} from '@/App/Services/Providers/Modules/Admin';
import {parseDate} from "@/App/Functions/Custom/parseDate.Function";

export interface IAccountingHistoryViewProps {
    type: IAccountingHistory['type'],
}

export interface IAccountingHistoryViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        accounting_histories: IAccountingHistory[],
        filter: {
            search: string,
        }
    },
    form: {
        open: boolean,
        is_edit: boolean,
        code: string,
        uuid: string,
        account_category_uuid: IAccountCategory['uuid'],
        account_category_name: IAccountCategory['name'],
        account_head_uuid: IAccountHead['uuid'],
        account_head_name: IAccountHead['name'],
        type: IAccountingHistory['type'],
        comment: string | null,
        total_amount: IAccountingHistory['total_amount'],
        date: IAccountingHistory['date'] | any,
    },
    view: {
        open: boolean,
        data: Partial<IAccountingHistory>,
    },
    additional: {}
}

class AccountingHistoryView extends View<IAccountingHistoryViewProps, IAccountingHistoryViewState> {
    constructor(props: IAccountingHistoryViewProps) {
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

                accounting_histories: [],
                filter: {
                    search: "",
                },
            },
            form: {
                open: false,
                is_edit: false,
                code: '',
                uuid: '',
                account_category_name: '',
                account_category_uuid: '',
                account_head_name: '',
                account_head_uuid: '',
                comment: '',
                date: parseDate(new Date()),
                total_amount: 0,
                type: this.props.type,
            },
            view: {
                open: false,
                data: {},
            },
            additional: {}
        };

        this.state = this.initialState;

        this.saveAccountingHistory = this.saveAccountingHistory.bind(this);
    }

    private getAccountingHistories(): void {
        AccountingHistoryProvider.getAccountingHistoryForGrid(
            this.state.grid.rows_per_page,
            this.state.grid.current_page,
            this.state.grid.filter.search,
            this.props.type,
            (data) => {
                this.setPaginationData(
                    data.TotalPages,
                    data.PrevPage,
                    data.NextPage,
                    data.LastPage,
                );
                this.setGridState({accounting_histories: data.ListData});
            }
        );
    }

    private saveAccountingHistory(): void {
        if (this.state.form.account_category_uuid === '') {
            toaster.danger('Please select Account Category');
            return;
        }

        if (this.state.form.account_head_uuid === '') {
            toaster.danger('Please select Account Head');
            return;
        }
        if (this.state.form.total_amount === 0) {
            toaster.danger('Amount can not be empty!');
            return;
        }

        AccountingHistoryProvider.saveAccountingHistory(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getAccountingHistories();
        })
    }

    componentDidMount(): void {
        this.getAccountingHistories();
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
                                    moduleTitle={"Accounting History List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />

                                <AccountingHistoryGridScreen
                                    gridData={this.state.grid}
                                    formData={this.state.form}
                                    onReload={this.getAccountingHistories}
                                    onView={(data) => this.setViewState({
                                        open: true,
                                        data,
                                    })}
                                    onDelete={(uuid) => {
                                        if (window.confirm("Are you sure?")) {
                                            AccountHeadProvider.deleteAccountHead(uuid, (data) => {
                                                toaster.success(data.message);
                                                this.getAccountingHistories();
                                            })
                                        }
                                    }}
                                    onEdit={(item) => {
                                        this.setFormState({
                                            uuid: item.uuid,
                                            is_edit: true,
                                            open: true,
                                            type: item.type,
                                            account_category_uuid: item.account_category_uuid,
                                            comment: item.comment,
                                            account_head_name: item.account_head_name,
                                            account_category_name: item.account_category_name,
                                            account_head_uuid: item.account_head_uuid,
                                            total_amount: item.total_amount,
                                            date: item.date,
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

                                <AccountingHistoryFormScreen
                                    type={this.props.type}
                                    formData={this.state.form}
                                    onFormClose={this.resetFormState}
                                    onFormStateChange={this.setFormState}
                                    saveAccountingHistory={this.saveAccountingHistory}
                                />
                            </div>
                        </div>

                    </div>

                </MainLayout>
            </Fragment>
        );
    }
}

export default AccountingHistoryView;
