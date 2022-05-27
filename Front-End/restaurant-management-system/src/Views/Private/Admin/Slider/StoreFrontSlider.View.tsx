import React, {Fragment, ReactElement} from 'react';
import {IStoreFrontSlider} from "@/App/Interfaces/Models";
import View from "@/Components/Base/View";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {
    StoreFrontSliderFormScreen,
    StoreFrontSliderGridScreen, StoreFrontSliderViewScreen
} from "@/Components/Screens/Private/Admin/StoreFrontSlider";
import {convertToString} from "@/App/Functions/Custom";
import {toaster} from "evergreen-ui";
import {StoreFrontSliderProvider} from "@/App/Services/Providers/Modules/Admin";

export interface IStoreFrontSliderViewProps {

}

export interface IStoreFrontSliderViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        slides: IStoreFrontSlider[],

        filter: {
            search: string,
        }
    }

    form: {
        is_uploading: boolean,
        open: boolean,
        uuid: IStoreFrontSlider['uuid'],
        image_uri: IStoreFrontSlider['image_uri'],
        description: IStoreFrontSlider['description'],
        description_text_color: IStoreFrontSlider['description_text_color'],
        description_text_color_picker_open: boolean,
        is_featured: IStoreFrontSlider['is_featured'],
    }

    view: {
        open: boolean,
        data: Partial<IStoreFrontSlider>
    }

    additional: {}
}

class StoreFrontSliderView extends View<IStoreFrontSliderViewProps, IStoreFrontSliderViewState> {

    constructor(props: IStoreFrontSliderViewProps) {
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

                slides: [],
                filter: {
                    search: ''
                }
            },

            form: {
                is_featured: false,
                is_uploading: false,
                image_uri: '',
                description: '',
                description_text_color: '',
                description_text_color_picker_open: false,
                open: false,
                uuid: '',
            },

            view: {
                data: {},
                open: false,
            },

            additional: {}
        };

        this.state = this.initialState;
        this.getStoreFrontSlides = this.getStoreFrontSlides.bind(this);
        this.saveStoreFrontSlide = this.saveStoreFrontSlide.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getStoreFrontSlides);
    }

    private getStoreFrontSlides(): void {
        StoreFrontSliderProvider.getStoreFrontSlidesForGrid(
            this.state.grid.rows_per_page,
            this.state.grid.current_page,
            this.state.grid.filter.search,
            (data) => {
                console.log(data.ListData);
                this.setPaginationData(
                    data.TotalPages,
                    data.PrevPage,
                    data.NextPage,
                    data.LastPage,
                )
                this.setGridState({slides: data.ListData});
            });
    }

    private saveStoreFrontSlide(): void {
        const formData = this.state.form;

        if(convertToString(formData.image_uri) === "") {
            toaster.danger("Please select an image!");
            return;
        }

        StoreFrontSliderProvider.saveStoreFrontSlide(formData, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getStoreFrontSlides();
        });
    }

    public componentDidMount(): void {
        this.getStoreFrontSlides();
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
                                    moduleTitle={"Store Front Slider List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />
                                <StoreFrontSliderGridScreen
                                    formData={this.state.form}
                                    gridData={this.state.grid}
                                    onReload={this.getStoreFrontSlides}
                                    onView={(data) => this.setViewState({
                                        open: true,
                                        data,
                                    })}
                                    onEdit={(uuid, image_uri, description, description_text_color, is_featured) => {
                                        this.setFormState({
                                            open: true,
                                            uuid,
                                            image_uri,
                                            is_featured,
                                            description,
                                            description_text_color,
                                            is_uploading: false
                                        });
                                    }}
                                    onDelete={(uuid) => {
                                        if (window.confirm("Are you sure?")) {
                                            StoreFrontSliderProvider.deleteStoreFrontSlide(uuid, (data) => {
                                                toaster.success(data.message);
                                                this.getStoreFrontSlides();
                                            });
                                        }
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
                                <StoreFrontSliderFormScreen
                                    formData={this.state.form}
                                    onFormStateChange={this.setFormState}
                                    onFormSubmit={this.saveStoreFrontSlide}
                                    onFormClose={this.resetFormState}
                                />
                                <StoreFrontSliderViewScreen
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

export default StoreFrontSliderView;
