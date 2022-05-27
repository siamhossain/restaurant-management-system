import React, {Fragment, ReactElement} from 'react';
import {IIngredientCategory} from "@/App/Interfaces/Models";
import {CategoryProvider, IngredientCategoryProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {CategoryFormScreen, CategoryTreeScreen, CategoryViewScreen} from "@/Components/Screens/Private/Admin/Category";
import {convertToString} from "@/App/Functions/Custom";
import {
    IngredientCategoryFormScreen,
    IngredientCategoryTreeScreen
} from "@/Components/Screens/Private/Admin/IngredientCategory";

export interface IIngredientCategoryViewProps {

}

export interface IIngredientCategoryViewState {
    ingredient_categories: IIngredientCategory[],
    form: {
        open: boolean,
        is_image_uploading: boolean,
        is_banner_uploading: boolean,
        is_slug_suggestions_loading: boolean,
        uuid: IIngredientCategory['uuid'],
        code: IIngredientCategory['code'],
        parent_cat_uuid: IIngredientCategory['parent_cat_uuid'],
        is_featured: IIngredientCategory['is_featured'],
        name: IIngredientCategory['name'],
        description: IIngredientCategory['description'],
        slug: IIngredientCategory['slug'],
        image_uri: IIngredientCategory['image_uri'],
        banner_image_uri: IIngredientCategory['banner_image_uri'],
        banner_text: IIngredientCategory['banner_text'],
        status: IIngredientCategory['status'],
        slug_exists: boolean,
        slug_suggestions: string[],
    },
    view: {
        open: boolean,
        data: Partial<IIngredientCategory>,
    }
}

export type  IIngredientCategoryViewFormState = { [key in keyof IIngredientCategoryViewState['form']]?: IIngredientCategoryViewState['form'][key] };

class IngredientCategoryView extends React.Component<IIngredientCategoryViewProps, IIngredientCategoryViewState> {
    private readonly initialState: IIngredientCategoryViewState;

    constructor(props: IIngredientCategoryViewProps) {
        super(props);

        this.initialState = {
            ingredient_categories: [],

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

        this.getIngredientCategories = this.getIngredientCategories.bind(this);
        this.checkSlug = this.checkSlug.bind(this);
        this.setFormState = this.setFormState.bind(this);
        this.resetFormState = this.resetFormState.bind(this);
        this.saveIngredientCategory = this.saveIngredientCategory.bind(this);
        this.renameCategory = this.renameCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    private getIngredientCategories(): void {
        IngredientCategoryProvider.getIngredientCategoriesForGrid((data) => this.setState({
            ingredient_categories: data,
        }));
    }

    private setFormState(state: IIngredientCategoryViewFormState, callback: undefined | (() => void) = undefined): void {
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

    private saveIngredientCategory(): void {
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

        IngredientCategoryProvider.saveCategory({
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
            this.getIngredientCategories();
            this.resetFormState();
        }));
    }

    private checkSlug(): void {
        this.setFormState({
            is_slug_suggestions_loading: true,
        }, () => {
            IngredientCategoryProvider.checkSlug({
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
        IngredientCategoryProvider.saveCategorySingleProperty({
            uuid,
            key: 'name',
            value: name,
        }, (data) => {
            toaster.success(data.message);
            this.getIngredientCategories();
        });
    }

    private deleteCategory(uuid: string): void {
        if (!window.confirm("Are you sure to delete?")) {
            return;
        }

        IngredientCategoryProvider.deleteCategory(uuid, (data) => {
            toaster.success(data.message);
            this.getIngredientCategories();
        });
    }

    public componentDidMount(): void {
        this.getIngredientCategories();
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
                                    moduleTitle={"Ingredient Categories"}
                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />
                                <IngredientCategoryTreeScreen
                                    categories={this.state.ingredient_categories}
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

                                <IngredientCategoryFormScreen
                                    formData={this.state.form}
                                    onFormSubmit={this.saveIngredientCategory}
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

export default IngredientCategoryView;
