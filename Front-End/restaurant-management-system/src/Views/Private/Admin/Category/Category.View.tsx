import React, {Fragment, ReactElement} from 'react';
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {CategoryFormScreen, CategoryViewScreen, CategoryTreeScreen} from "@/Components/Screens/Private/Admin/Category";
import {toaster} from "evergreen-ui";
import {ICategory} from "@/App/Interfaces/Models/Category.Interface";
import {CategoryProvider} from "@/App/Services/Providers/Modules/Admin/Category.Provider";
import {convertToString} from "@/App/Functions/Custom";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";

export interface ICategoryViewProps {

}

export interface ICategoryViewState {
    categories: ICategory[],
    form: {
        open: boolean,
        is_image_uploading: boolean,
        is_banner_uploading: boolean,
        is_slug_suggestions_loading: boolean,
        uuid: ICategory['uuid'],
        code: ICategory['code'],
        parent_cat_uuid: ICategory['parent_cat_uuid'],
        is_featured: ICategory['is_featured'],
        name: ICategory['name'],
        description: ICategory['description'],
        slug: ICategory['slug'],
        image_uri: ICategory['image_uri'],
        banner_image_uri: ICategory['banner_image_uri'],
        banner_text: ICategory['banner_text'],
        status: ICategory['status'],
        slug_exists: boolean,
        slug_suggestions: string[],
    },
    view: {
        open: boolean,
        data: Partial<ICategory>,
    }
}

export type  ICategoryViewFormState = { [key in keyof ICategoryViewState['form']]?: ICategoryViewState['form'][key] };

class CategoryView extends React.Component<ICategoryViewProps, ICategoryViewState> {
    private readonly initialState: ICategoryViewState;

    constructor(props: ICategoryViewProps) {
        super(props);

        this.initialState = {
            categories: [],

            form: {
                open: false,
                is_image_uploading: false,
                is_banner_uploading: false,
                is_slug_suggestions_loading: false,

                uuid: '',
                code: '',
                parent_cat_uuid: '',
                is_featured: false,
                name: '',
                description: '',
                slug: '',
                image_uri: '',
                banner_image_uri: '',
                banner_text: '',
                status: 'Active',
                slug_exists: false,
                slug_suggestions: [],
            },
            view: {
                open: false,
                data: {},
            }
        };

        this.state = this.initialState;

        this.getCategories = this.getCategories.bind(this);
        this.checkSlug = this.checkSlug.bind(this);
        this.setFormState = this.setFormState.bind(this);
        this.resetFormState = this.resetFormState.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
        this.renameCategory = this.renameCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    private getCategories(): void {
        CategoryProvider.getCategoriesForGrid((data) => this.setState({
            categories: data,
        }));
    }

    private setFormState(state: ICategoryViewFormState, callback: undefined | (() => void) = undefined): void {
        this.setState((_state) => ({
            ..._state,
            form: {
                ..._state.form,
                ...state,
            }
        }), callback);
    }

    private resetFormState(): void {
        this.setState((state) => ({
            ...state,
            form: this.initialState.form,
        }))
    }

    private saveCategory(): void {
        const {uuid, name, slug, slug_exists, description, is_featured, image_uri, banner_image_uri, banner_text, parent_cat_uuid, status} = this.state.form;

        if (slug === '') {
            toaster.danger("Slug not be empty!");
            return;
        }
        if (slug_exists) {
            toaster.danger("Please enter a unique slug!");
            return;
        }

        if ((uuid?.trim() !== "" && parent_cat_uuid?.trim() !== "") && uuid?.trim() === parent_cat_uuid?.trim()) {
            toaster.danger("You can not select self category as a parent!");
            return;
        }

        if (name?.trim() === '') {
            toaster.danger("Enter category name!");
            return;
        }

        CategoryProvider.saveCategory({
            uuid,
            name,
            slug,
            description,
            is_featured,
            image_uri,
            banner_image_uri,
            banner_text,
            parent_cat_uuid,
            status,
        }, (data => {
            toaster.success(data.message);
            this.getCategories();
            this.resetFormState();
        }));
    }

    private checkSlug(): void {
        this.setFormState({
            is_slug_suggestions_loading: true,
        }, () => {
            CategoryProvider.checkSlug({
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

    private renameCategory(uuid: string, name: string): void {
        CategoryProvider.saveCategorySingleProperty({
            uuid,
            key: 'name',
            value: name,
        }, (data) => {
            toaster.success(data.message);
            this.getCategories();
        });
    }

    private deleteCategory(uuid: string): void {
        if (!window.confirm("Are you sure to delete?")) {
            return;
        }

        CategoryProvider.deleteCategory(uuid, (data) => {
            toaster.success(data.message);
            this.getCategories();
        });
    }

    public componentDidMount(): void {
        this.getCategories();
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
                                    moduleTitle={"Categories"}
                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />
                                <CategoryTreeScreen
                                    categories={this.state.categories}
                                    onRename={(uuid, value) => this.renameCategory(uuid, convertToString(value))}
                                    onFormStateChange={this.setFormState}
                                    onDelete={this.deleteCategory}
                                    onView={(data => this.setState((state) => ({
                                        view: {
                                            ...state.view,
                                            open: true,
                                            data,
                                        }
                                    })))}
                                />

                                <CategoryFormScreen
                                    formData={this.state.form}
                                    onFormSubmit={this.saveCategory}
                                    onFormClose={this.resetFormState}
                                    onFormStateChange={this.setFormState}
                                    onCheckSlug={this.checkSlug}
                                />

                                <CategoryViewScreen
                                    viewData={this.state.view}
                                    onViewClose={() => this.setState({
                                        view: {
                                            open: false,
                                            data: {},
                                        }
                                    })}
                                />
                            </div>
                        </div>

                    </div>

                </MainLayout>
            </Fragment>
        );
    }
}

export default CategoryView;
