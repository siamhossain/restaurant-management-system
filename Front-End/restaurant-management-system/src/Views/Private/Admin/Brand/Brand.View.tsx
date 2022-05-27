import React, {Fragment, ReactElement} from 'react';
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import View from "@/Components/Base/View";
import {IBrand} from "@/App/Interfaces/Models";
import {BrandProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import {BrandFormScreen, BrandGridScreen, BrandViewScreen} from "@/Components/Screens/Private/Admin/Brand";

export interface IBrandViewProps {

}

export interface IBrandViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        units: IBrand[],

        filter: {
            search: string,
        }
    },
    form: {
        is_edit: boolean,
        is_uploading: boolean,
        code: string,
        open: boolean,
        uuid: IBrand['uuid'],
        name: IBrand['name'],
        slug: IBrand['slug'],
        logo_uri: IBrand['logo_uri'],
        is_featured: boolean,
        status: IBrand['status'],
        is_slug_suggestions_loading: boolean,
        slug_exists: boolean,
        slug_suggestions: any[],

    },
    view: {
        open: boolean,
        data: Partial<IBrand>
    },
    additional: {}
}
class BrandView extends View<IBrandViewProps, IBrandViewState> {
    constructor(props: IBrandViewProps) {
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

                units: [],
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
                slug: '',
                logo_uri: '',
                is_featured: false,
                status: "Active",
                is_slug_suggestions_loading: false,
                slug_exists: false,
                slug_suggestions: [],

            },

            view: {
                open: false,
                data: {}
            },

            additional: {}
        };

        this.state = this.initialState;

        this.getBrands = this.getBrands.bind(this);
        this.saveBrand = this.saveBrand.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getBrands);
    }

    private getBrands(): void {
        BrandProvider.getBrandsForGrid(
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
                this.setGridState({units: data.ListData});
            });
    }

    private checkSlug(): void {
        this.setFormState({
            is_slug_suggestions_loading: true,
        }, () => {
            BrandProvider.checkSlug({
                uuid: this.state.form.uuid,
                slug: this.state.form.slug,
            }, (data) => {
                this.setFormState({
                    slug_exists: data.exists,
                    slug_suggestions: data.suggestions,
                    is_slug_suggestions_loading: false,
                });
            });
        });
    }

    private saveBrand(): void {
        if (this.state.form.name === '') {
            toaster.danger("Full name can not be empty!");
            return;
        }

        BrandProvider.saveBrand(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getBrands();
        });
    }

    public componentDidMount(): void {
        this.getBrands();
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
                                    moduleTitle={"Brand List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />
                                <BrandGridScreen
                                    gridData={this.state.grid}
                                    formData={this.state.form}
                                    onReload={this.getBrands}
                                    onView={(data) => this.setViewState({
                                        open: true,
                                        data,
                                    })}
                                    onDelete={(uuid) => {
                                        if (window.confirm("Are you sure?")) {
                                            BrandProvider.deleteBrand(uuid, (data) => {
                                                toaster.success(data.message);
                                                this.getBrands();
                                            })
                                        }
                                    }}
                                    onEdit={(item) => {
                                        this.setFormState({
                                            uuid: item.uuid,
                                            open: true,
                                            is_featured: item.is_featured,
                                            name: item.name,
                                            logo_uri: item.logo_uri,
                                            status: item.status,
                                            slug: item.slug,

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
                                <BrandFormScreen
                                    formData={this.state.form}
                                    onFormStateChange={this.setFormState}
                                    onFormClose={this.resetFormState}
                                    onFormSubmit={this.saveBrand}
                                    onCheckSlug={this.checkSlug}
                                />
                                <BrandViewScreen
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

export default BrandView;
