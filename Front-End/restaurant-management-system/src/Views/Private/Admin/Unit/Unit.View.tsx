import React, {Fragment, ReactElement} from 'react';
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {UnitProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import View from "@/Components/Base/View";
import {IUnit} from "@/App/Interfaces/Models";
import {UnitFormScreen, UnitGridScreen, UnitViewScreen} from "@/Components/Screens/Private/Admin/Unit";

export interface IUnitViewProps {

}

export interface IUnitViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        units: IUnit[],

        filter: {
            search: string,
        }
    },
    form: {
        is_edit: boolean,
        is_uploading: boolean,
        code: string,
        open: boolean,
        uuid: IUnit['uuid'],
        name: IUnit['name'],
    },
    view: {
        open: boolean,
        data: Partial<IUnit>
    },
    additional: {}
}
class UnitView extends View<IUnitViewProps, IUnitViewState> {
    constructor(props: IUnitViewProps) {
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
            },

            view: {
                open: false,
                data: {}
            },

            additional: {}
        };

        this.state = this.initialState;

        this.getUnits = this.getUnits.bind(this);
        this.saveUnit = this.saveUnit.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getUnits);
    }

    private getUnits(): void {
        UnitProvider.getUnitsForGrid(
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


    private saveUnit(): void {
        if (this.state.form.name === '') {
            toaster.danger("Full name can not be empty!");
            return;
        }

        UnitProvider.saveUnit(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getUnits();
        });
    }

    public componentDidMount(): void {
        this.getUnits();
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
                                    moduleTitle={"Unit List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />
                                <UnitGridScreen
                                    gridData={this.state.grid}
                                    formData={this.state.form}
                                    onReload={this.getUnits}
                                    onView={(data) => this.setViewState({
                                        open: true,
                                        data,
                                    })}
                                    onDelete={(uuid) => {
                                        if (window.confirm("Are you sure?")) {
                                            UnitProvider.deleteUnit(uuid, (data) => {
                                                toaster.success(data.message);
                                                this.getUnits();
                                            })
                                        }
                                    }}
                                    onEdit={(item) => {
                                        this.setFormState({
                                            uuid: item.uuid,
                                            open: true,
                                            name: item.name,
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

                                <UnitFormScreen
                                    formData={this.state.form}
                                    onFormStateChange={this.setFormState}
                                    onFormClose={this.resetFormState}
                                    onFormSubmit={this.saveUnit}
                                />

                                <UnitViewScreen
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

export default UnitView;
