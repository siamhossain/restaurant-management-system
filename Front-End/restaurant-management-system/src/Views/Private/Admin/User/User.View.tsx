import React, {Fragment, ReactElement} from 'react';
import {IUser, IUserRole} from "@/App/Interfaces/Models";
import {UserProvider, UserRoleProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {UserFormScreen, UserGridScreen, UserViewScreen} from "@/Components/Screens/Private/Admin/User";
import View from "@/Components/Base/View";

export interface IUserViewProps {

}

export interface IUserViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        users: IUser[],
        user_roles: IUserRole[],

        filter: {
            search: string,
        }
    },
    form: {
        open: boolean,
        is_edit: boolean,
        is_uploading: boolean,
        code: IUser['code'],
        role_id: IUser['role_id'],
        uuid: IUser['uuid'],
        name: IUser['name'],
        username: IUser['username'],
        address: IUser['address'],
        phone: IUser['phone'],
        email: IUser['email'],
        password: IUser['password'],
        is_featured: boolean,
        status: "Active" | "Inactive" | "Banned" | "Pending",
    },
    view: {
        open: boolean,
        data: Partial<IUser>
    },
    additional: {}
}

class UserView extends View<IUserViewProps, IUserViewState> {
    constructor(props: IUserViewProps) {
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

                users: [],
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
                uuid: '',
                role_id: 0,
                name: '',
                username: '',
                address: '',
                phone: '',
                email: '',
                password: '',
                is_featured: false,
                status: "Active",
            },

            view: {
                open: false,
                data: {}
            },

            additional: {}
        };

        this.state = this.initialState;

        this.getUsers = this.getUsers.bind(this);
        this.getUserRole = this.getUserRole.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getUsers);
    }

    private getUsers(): void {
        UserProvider.getUsersForGrid(
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
                this.setGridState({users: data.ListData});
            });
    }

    private saveUser(): void {
        if (this.state.form.name === '') {
            toaster.danger("Full name can not be empty!");
            return;
        }
        if (this.state.form.phone === '') {
            toaster.danger("Phone number can not be empty!");
            return;
        }
        if (this.state.form.uuid === "" && this.state.form.password === '') {
            toaster.danger("Password can not be empty!");
            return;
        }

        UserProvider.saveUser(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getUsers();
        });
    }

    public getUserRole() : void {
        UserRoleProvider.getUserRolesNoLimit('',(data) => {
            this.setGridState({
                user_roles: data,
            })
        })
    }


    public componentDidMount(): void {
        this.getUsers();
        this.getUserRole();
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
                                    moduleTitle={"User List"}

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
                                    <UserGridScreen
                                        gridData={this.state.grid}
                                        formData={this.state.form}
                                        onReload={this.getUsers}
                                        onView={(data) => this.setViewState({
                                            open: true,
                                            data,
                                        })}
                                        onDelete={(uuid) => {
                                            if (window.confirm("Are you sure?")) {
                                                UserProvider.deleteUser(uuid, (data) => {
                                                    toaster.success(data.message);
                                                    this.getUsers();
                                                })
                                            }
                                        }}
                                        onEdit={(item) => {
                                            this.setFormState({
                                                uuid: item.uuid,
                                                is_edit: true,
                                                open: true,
                                                name: item.name,
                                                phone: item.phone,
                                                email: item.email,
                                                username: item.username,
                                                address: item.address,
                                                status: item.status,
                                                password: item.password,
                                                role_id: item.role_id,
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
                                </div>
                            </div>
                        </div>

                    </div>

                    <UserFormScreen
                        formData={this.state.form}
                        gridData={this.state.grid}
                        onFormStateChange={this.setFormState}
                        onFormSubmit={this.saveUser}
                        onFormClose={this.resetFormState}
                    />

                    <UserViewScreen
                        viewData={this.state.view}
                        onViewClose={this.resetViewState}
                    />



                </MainLayout>

            </Fragment>
        );
    }
}
export default UserView;
