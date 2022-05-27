import React, {Fragment, ReactElement} from 'react';
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import View from "@/Components/Base/View";
import {ISocialLink} from "@/App/Interfaces/Models";
import {toaster} from "evergreen-ui";
import {SocialLinkProvider} from "@/App/Services/Providers/Modules/Admin";
import {
    SocialLinkFormScreen,
    SocialLinkGridScreen,
    SocialLinkViewScreen
} from "@/Components/Screens/Private/Admin/SocialLink";

export interface ISocialLinkViewProps {

}

export interface ISocialLinkViewState {
    grid: {
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        Social_links: ISocialLink[]
        filter: {
            search: string,
        },
    },
    form: {

        open: boolean,
        uuid: string,
        name: ISocialLink['name'],
        icon_uri: ISocialLink['icon_uri'],
        website_url: ISocialLink['website_url'],
        is_uploading: boolean,
    },

    view: {
        data: Partial<ISocialLink>,
        open: boolean,
    }

}
class SocialLinkView extends View<ISocialLinkViewProps, ISocialLinkViewState> {
    constructor(props: ISocialLinkViewProps) {
        super(props);
        this.initialState = {
            grid: {
                rows_per_page: 10,
                current_page: 0,
                total_pages: 0,
                prev_page: 0,
                next_page: 0,
                first_page: 0,
                last_page: 0,

                Social_links: [],
                filter: {
                    search: "",
                },
            },
            form: {
                open: false,
                uuid: "",
                icon_uri: "",
                name: "",
                website_url: "",
                is_uploading: false,
            },
            view: {
                data: {},
                open: false,
            },

            additional: {}
        }
        this.state = this.initialState;

        this.saveSocialLink = this.saveSocialLink.bind(this);
    }

    private getSocialLinks(): void {
        SocialLinkProvider.getSocialLinksForGrid(
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
                this.setGridState({Social_links: data.ListData});
            });
    }

    private saveSocialLink(): void {

        if (this.state.form.name === '') {
            toaster.danger("Name Can not be empty!");
            return;
        }

        if (this.state.form.website_url === '') {
            toaster.danger("Website can be empty!");
            return;
        }

        SocialLinkProvider.saveSocialLink(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getSocialLinks();

        });

    }

    componentDidMount(): void {
        this.getSocialLinks();
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
                                    moduleTitle={"Social List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />

                                <SocialLinkGridScreen
                                    formData={this.state.form}
                                    gridData={this.state.grid}
                                    onReload={this.getSocialLinks}
                                    onView={(data) => this.setViewState({
                                        open: true,
                                        data,
                                    })}

                                    onEdit={(item) => {
                                        this.setFormState({
                                            open: true,
                                            icon_uri: item.icon_uri,
                                            name: item.name,
                                            uuid: item.uuid,
                                            website_url: item.website_url,
                                        });
                                    }}
                                    onDelete={(uuid) => {
                                        if (window.confirm("Are you sure?")) {
                                            SocialLinkProvider.deleteSocialLink(uuid, (data) => {
                                                toaster.success(data.message);
                                                this.getSocialLinks();
                                            })
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
                                <SocialLinkFormScreen
                                    formData={this.state.form}
                                    onFormStateChange={this.setFormState}
                                    onFormSubmit={this.saveSocialLink}
                                    onFormClose={this.resetFormState}
                                />
                                <SocialLinkViewScreen
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

export default SocialLinkView;
