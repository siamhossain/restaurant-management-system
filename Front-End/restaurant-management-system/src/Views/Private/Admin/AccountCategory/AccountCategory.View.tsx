import React, {Fragment, ReactElement} from 'react';
import {IAccountCategory, IUnit} from "@/App/Interfaces/Models";
import View from "@/Components/Base/View";
import {AccountCategoryProvider, UnitProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import {IUnitViewProps} from "@/Views/Private/Admin/Unit/Unit.View";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {
    AccountCategoryFormScreen,
    AccountCategoryGridScreen,
    AccountCategoryViewScreen
} from "@/Components/Screens/Private/Admin/AccountCategory";

export interface IAccountCategoryViewProps {

}

export interface IAccountCategoryViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        account_categories: IAccountCategory[],

        filter: {
            search: string,
        }
    },
    form: {
        is_edit: boolean,
        is_uploading: boolean,
        code: string,
        open: boolean,
        uuid: IAccountCategory['uuid'],
        name: IAccountCategory['name'],
        type: IAccountCategory['type'],
    },
    view: {
        open: boolean,
        data: Partial<IAccountCategory>
    },
    additional: {}
}
class AccountCategoryView extends View<IAccountCategoryViewProps, IAccountCategoryViewState> {
    constructor(props: IAccountCategoryViewProps) {
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

                account_categories: [],
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
            },

            view: {
                open: false,
                data: {}
            },

            additional: {}
        };

        this.state = this.initialState;

        this.getAccountCategories = this.getAccountCategories.bind(this);
        this.saveAccountCategory = this.saveAccountCategory.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getAccountCategories);
    }

    private getAccountCategories(): void {
        AccountCategoryProvider.getAccountCategoriesForGrid(
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
                this.setGridState({account_categories: data.ListData});
            });
    }


    private saveAccountCategory(): void {
        if (this.state.form.name === '') {
            toaster.danger("Full name can not be empty!");
            return;
        }

        AccountCategoryProvider.saveAccountCategory(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getAccountCategories();
        });
    }

    public componentDidMount(): void {
        this.getAccountCategories();
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
                                    moduleTitle={"Account Category List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />

                                <AccountCategoryGridScreen
                                    gridData={this.state.grid}
                                    formData={this.state.form}
                                    onReload={this.getAccountCategories}
                                    onView={(data) => this.setViewState({
                                        open: true,
                                        data,
                                    })}
                                    onDelete={(uuid) => {
                                        if (window.confirm("Are you sure?")) {
                                            AccountCategoryProvider.deleteAccountCategory(uuid, (data) => {
                                                toaster.success(data.message);
                                                this.getAccountCategories();
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

                                <AccountCategoryFormScreen
                                    formData={this.state.form}
                                    onFormStateChange={this.setFormState}
                                    onFormClose={this.resetFormState}
                                    onFormSubmit={this.saveAccountCategory}
                                />

                                <AccountCategoryViewScreen
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

export default AccountCategoryView;
