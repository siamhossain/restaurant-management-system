import React, {Fragment, ReactElement} from 'react';
import {IAccountHead} from "@/App/Interfaces/Models";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import View from "@/Components/Base/View";
import {
    AccountHeadFormScreen,
    AccountHeadGridScreen,
    AccountHeadViewScreen
} from "@/Components/Screens/Private/Admin/AccountHead";
import {AccountHeadProvider, UnitProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import {AccountCategoryGridScreen, AccountCategoryViewScreen} from "@/Components/Screens/Private/Admin/AccountCategory";

export interface IAccountHeadViewProps {

}

export interface IAccountHeadViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        account_heads: IAccountHead[],

        filter: {
            search: string,
        }
    },
    form: {
        is_edit: boolean,
        is_uploading: boolean,
        code: string,
        open: boolean,
        uuid: IAccountHead['uuid'],
        name: IAccountHead['name'],
        type: IAccountHead['type'],
        account_category_uuid: IAccountHead['account_category_uuid'],
    },
    view: {
        open: boolean,
        data: Partial<IAccountHead>
    },
    additional: {}
}
class AccountHeadView extends View<IAccountHeadViewProps, IAccountHeadViewState> {
    constructor(props: IAccountHeadViewProps) {
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

                account_heads: [],
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
                name: '',
                type: 'Income',
                account_category_uuid: '',
            },

            view: {
                open: false,
                data: {}
            },

            additional: {}
        };

        this.state = this.initialState;

        this.getAccountHeads = this.getAccountHeads.bind(this);
        this.saveAccountHead = this.saveAccountHead.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getAccountHeads);
    }

    private getAccountHeads(): void {
        AccountHeadProvider.getAccountHeadsForGrid(
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
                this.setGridState({account_heads: data.ListData});
            });
    }


    private saveAccountHead(): void {
        if (this.state.form.name === '') {
            toaster.danger("Full name can not be empty!");
            return;
        }

        AccountHeadProvider.saveAccountHead(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getAccountHeads();
        });
    }

    public componentDidMount(): void {
        this.getAccountHeads();
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
                                    moduleTitle={"Account Head List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />

                                <AccountHeadGridScreen
                                    gridData={this.state.grid}
                                    formData={this.state.form}
                                    onReload={this.getAccountHeads}
                                    onView={(data) => this.setViewState({
                                        open: true,
                                        data,
                                    })}
                                    onDelete={(uuid) => {
                                        if (window.confirm("Are you sure?")) {
                                            AccountHeadProvider.deleteAccountHead(uuid, (data) => {
                                                toaster.success(data.message);
                                                this.getAccountHeads();
                                            })
                                        }
                                    }}
                                    onEdit={(item) => {
                                        this.setFormState({
                                            uuid: item.uuid,
                                            is_edit: true,
                                            open: true,
                                            name: item.name,
                                            type: item.type,
                                            account_category_uuid: item.account_category_uuid,
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

                                <AccountHeadFormScreen
                                    formData={this.state.form}
                                    onFormStateChange={this.setFormState}
                                    onFormClose={this.resetFormState}
                                    onFormSubmit={this.saveAccountHead}
                                />

                                <AccountHeadViewScreen
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

export default AccountHeadView;
