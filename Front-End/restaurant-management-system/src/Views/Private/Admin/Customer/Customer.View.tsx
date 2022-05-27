import React, {Fragment, ReactElement} from 'react';
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import View from "@/Components/Base/View";
import {toaster} from "evergreen-ui";
import {ICustomer} from "@/App/Interfaces/Models";
import {CustomerProvider} from "@/App/Services/Providers/Modules/Admin";
import {CustomerFormScreen, CustomerGridScreen, CustomerViewScreen} from "@/Components/Screens/Private/Admin/Customer";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";

export interface ICustomerViewProps {

}

export interface ICustomerViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        customers: ICustomer[],

        filter: {
            search: string,
        }
    },
    form: {
        is_edit: boolean,
        is_uploading: boolean,
        code: string,
        open: boolean,
        uuid: string,
        name: string,
        area_code: string,
        address: string,
        profile_image_uri: string,
        phone_number: string | number,
        email: string | number,
        password: string | number,
        is_featured: boolean,
        status: "Active" | "Inactive" | "Banned" | "Pending",
    },
    view: {
        open: boolean,
        data: Partial<ICustomer>
    },
    additional: {}
}

class CustomerView extends View<ICustomerViewProps, ICustomerViewState> {
    constructor(props: ICustomerViewProps) {
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

                customers: [],
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

        this.getCustomers = this.getCustomers.bind(this);
        this.saveCustomer = this.saveCustomer.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getCustomers);
    }

    private getCustomers(): void {
        CustomerProvider.getCustomersForGrid(
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
                this.setGridState({customers: data.ListData});
            });
    }

    private saveCustomer(): void {
        if (this.state.form.name === '') {
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

        CustomerProvider.saveCustomer(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getCustomers();

        });
    }


    public componentDidMount(): void {
        this.getCustomers();
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
                                  moduleTitle={"Customer List"}

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
                                  <CustomerGridScreen
                                      gridData={this.state.grid}
                                      formData={this.state.form}
                                      onReload={this.getCustomers}
                                      onView={(data) => this.setViewState({
                                          open: true,
                                          data,
                                      })}
                                      onDelete={(uuid) => {
                                          if (window.confirm("Are you sure?")) {
                                              CustomerProvider.deleteCustomer(uuid, (data) => {
                                                  toaster.success(data.message);
                                                  this.getCustomers();
                                              })
                                          }
                                      }}
                                      onEdit={(item) => {
                                          this.setFormState({
                                              uuid: item.uuid,
                                              is_edit: true,
                                              open: true,
                                              name: item.name,
                                              phone_number: item.phone_number,
                                              email: item.email,
                                              area_code: item.area_code,
                                              address: item.address,
                                              profile_image_uri: item.profile_image_uri,
                                              status: item.status,
                                              password: item.password,

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

                    <CustomerFormScreen
                        formData={this.state.form}
                        onFormStateChange={this.setFormState}
                        onFormSubmit={this.saveCustomer}
                        onFormClose={this.resetFormState}
                    />

                    <CustomerViewScreen
                        viewData={this.state.view}
                        onViewClose={this.resetViewState}
                    />



                </MainLayout>

            </Fragment>
        );
    }
}

export default CustomerView;
