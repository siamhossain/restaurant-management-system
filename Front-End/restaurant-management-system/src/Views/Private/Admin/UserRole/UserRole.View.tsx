import React, {Fragment, ReactElement} from 'react';
import {IUserRole} from "@/App/Interfaces/Models";
import View from "@/Components/Base/View";
import {BrandProvider, UserRoleProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {UserRoleFormScreen, UserRoleGridScreen, UserRoleViewScreen} from "@/Components/Screens/Private/Admin/UserRole";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";

export interface IUserRoleViewProps {

}

export interface IUserRoleViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        user_roles: IUserRole[],

        filter: {
            search: string,
        }
    },
    form: {
        is_edit: boolean,
        is_uploading: boolean,
        code: string,
        open: boolean,
        id: IUserRole['id'],
        key: IUserRole['key'],
        title: IUserRole['title'],
    },
    view: {
        open: boolean,
        data: Partial<IUserRole>
    },
    additional: {}
}
class UserRoleView extends View<IUserRoleViewProps, IUserRoleViewState> {
    constructor(props: IUserRoleViewProps) {
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

                user_roles: [],
                filter: {
                    search: "",
                },
            },
            form: {
                is_edit: false,
                is_uploading: false,
                open: false,
                code: '',
                id: 0,
                title: '',
                key: '',
            },

            view: {
                open: false,
                data: {}
            },

            additional: {}
        };

        this.state = this.initialState;

        this.getUserRoles = this.getUserRoles.bind(this);
        this.saveUserRole = this.saveUserRole.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getUserRoles);
    }

    private getUserRoles(): void {
        UserRoleProvider.getUserRolesForGrid(
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
                this.setGridState({user_roles: data.ListData});
            });
    }


    private saveUserRole(): void {
        if (this.state.form.title === '') {
            toaster.danger("Full name can not be empty!");
            return;
        }

        UserRoleProvider.saveUserRole(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getUserRoles();
        });
    }

    public componentDidMount(): void {
        this.getUserRoles();
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
                                    moduleTitle={"UserRole List"}

                                    // actionButtons={[
                                    //     {
                                    //         label: "Add New",
                                    //         buttonProps: {
                                    //             onClick: () => this.setFormState({open: true}),
                                    //         }
                                    //     }
                                    // ]}
                                />
                                <UserRoleGridScreen
                                    gridData={this.state.grid}
                                    formData={this.state.form}
                                    onReload={this.getUserRoles}
                                    onView={(data) => this.setViewState({
                                        open: true,
                                        data,
                                    })}
                                    onDelete={(id) => {
                                        if (window.confirm("Are you sure?")) {
                                            UserRoleProvider.deleteUserRole(id, (data) => {
                                                toaster.success(data.message);
                                                this.getUserRoles();
                                            })
                                        }
                                    }}
                                    onEdit={(item) => {
                                        this.setFormState({
                                            id: item.id,
                                            open: true,
                                            title: item.title,
                                            key: item.key,
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

                                <UserRoleFormScreen
                                    formData={this.state.form}
                                    onFormStateChange={this.setFormState}
                                    onFormClose={this.resetFormState}
                                    onFormSubmit={this.saveUserRole}
                                />

                                <UserRoleViewScreen
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

export default UserRoleView;
