import React, {Fragment, ReactElement} from 'react';
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {SupplierFormScreen, SupplierGridScreen, SupplierViewScreen} from "@/Components/Screens/Private/Admin/Supplier";
import {CustomerProvider, SupplierProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import View from "@/Components/Base/View";
import {ISupplier} from "@/App/Interfaces/Models";

export interface ISupplierViewProps {

}

export interface ISupplierViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        suppliers: ISupplier[],

        filter: {
            search: string,
        }
    },
    form: {
        is_edit: boolean,
        is_uploading: boolean,
        code: string,
        open: boolean,
        uuid: ISupplier['uuid'],
        full_name: ISupplier['full_name'],
        area_code: ISupplier['area_code'],
        address: ISupplier['address'],
        profile_image_uri: ISupplier['profile_image_uri'],
        phone_number: ISupplier['phone_number'],
        email: ISupplier['email'],
        password: ISupplier['password'],
        is_featured: boolean,
        status: ISupplier['status'],
    },
    view: {
        open: boolean,
        data: Partial<ISupplier>
    },
    additional: {}
}

class SupplierView extends View<ISupplierViewProps, ISupplierViewState> {
    constructor(props: ISupplierViewProps) {
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

                suppliers: [],
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
                full_name: '',
                area_code: '',
                address: '',
                profile_image_uri: '',
                phone_number: '',
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

        this.getSuppliers = this.getSuppliers.bind(this);
        this.saveSupplier = this.saveSupplier.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getSuppliers);
    }

    private getSuppliers(): void {
        SupplierProvider.getSuppliersForGrid(
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
                this.setGridState({suppliers: data.ListData});
            });
    }

    private saveSupplier(): void {
        if (this.state.form.full_name === '') {
            toaster.danger("Full name can not be empty!");
            return;
        }
        if (this.state.form.phone_number === '') {
            toaster.danger("Phone number can not be empty!");
            return;
        }
        if (this.state.form.uuid === "" && this.state.form.password === '') {
            toaster.danger("Password can not be empty!");
            return;
        }

        SupplierProvider.saveSupplier(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getSuppliers();
        });
    }

    public componentDidMount(): void {
        this.getSuppliers();
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
                                    moduleTitle={"Supplier List"}

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
                                    <SupplierGridScreen
                                        gridData={this.state.grid}
                                        formData={this.state.form}
                                        onReload={this.getSuppliers}
                                        onView={(data) => this.setViewState({
                                            open: true,
                                            data,
                                        })}
                                        onDelete={(uuid) => {
                                            if (window.confirm("Are you sure?")) {
                                                SupplierProvider.deleteSupplier(uuid, (data) => {
                                                    toaster.success(data.message);
                                                    this.getSuppliers();
                                                })
                                            }
                                        }}
                                        onEdit={(item) => {
                                            this.setFormState({
                                                uuid: item.uuid,
                                                open: true,
                                                is_edit: true,
                                                full_name: item.full_name,
                                                phone_number: item.phone_number,
                                                address: item.address,
                                                email: item.email,
                                                status: item.status,
                                                area_code: item.area_code,
                                                profile_image_uri: item.profile_image_uri

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
                                <SupplierFormScreen
                                    formData={this.state.form}
                                    onFormStateChange={this.setFormState}
                                    onFormClose={this.resetFormState}
                                    onFormSubmit={this.saveSupplier}
                                />

                                <SupplierViewScreen
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

export default SupplierView;
