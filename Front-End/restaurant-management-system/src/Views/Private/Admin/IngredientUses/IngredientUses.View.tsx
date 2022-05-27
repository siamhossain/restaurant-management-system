import React, {Fragment, ReactElement} from 'react';
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import View from "@/Components/Base/View";
import {IIngredient, IIngredientUses} from "@/App/Interfaces/Models";
import {IProductViewProps} from "@/Views/Private/Admin/Product/Product.View";
import {IngredientProvider, IngredientUsesProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import {convertToBoolean} from "@/App/Functions/Custom/convertToBoolean.Function";
import {parseDate} from "@/App/Functions/Custom/parseDate.Function";
import {
    IngredientUsesFormScreen,
    IngredientUsesGridScreen,
    IngredientUsesViewScreen
} from "@/Components/Screens/Private/Admin/IngredientUses";
import {IngredientGridScreen} from "@/Components/Screens/Private/Admin/Ingredient";
import {BrandFormScreen} from "@/Components/Screens/Private/Admin/Brand";

export interface IIngredientUsesViewProps {

}

export interface IIngredientUsesViewState {
    grid: {
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        ingredients: IIngredientUses[],

        filter: {
            search: string,
        },
    },

    form: {
        open: boolean,
        edit_mode: boolean,
        uuid: IIngredientUses['uuid'],
        ingredient_uuid: IIngredientUses['ingredient_uuid'],
        date: IIngredientUses['date'],
        quantity: IIngredientUses['quantity'],
        stock: number,

    },

    view: {
        data: Partial<IIngredientUses>,
        open: boolean,
    }
}
class IngredientUsesView extends View<IIngredientUsesViewProps, IIngredientUsesViewState> {
    constructor(props: IIngredientUsesViewProps) {
        super(props);

        this.initialState = {
            grid: {
                rows_per_page: 10,
                current_page: 1,
                total_pages: 0,
                prev_page: 0,
                next_page: 0,
                first_page: 0,
                last_page: 0,

                ingredients: [],
                filter: {
                    search: "",
                },
            },

            form: {
                open: false,
                edit_mode: false,
                uuid: '',
                date: parseDate(new Date()),
                ingredient_uuid: '',
                quantity: 0,
                stock: 0,
            },

            view: {
                data: {},
                open: false,
            },

            additional: {}
        };

        this.state = this.initialState;

        this.getProducts = this.getProducts.bind(this);
        this.handleCheckStock = this.handleCheckStock.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getProducts);
    }

    private getProducts(): void {
        IngredientUsesProvider.getIngredientUsesForGrid(
            this.state.grid.rows_per_page,
            this.state.grid.current_page,
            this.state.grid.filter.search,
            (data) => {
                this.setPaginationData(
                    data.TotalPages,
                    data.PrevPage,
                    data.NextPage,
                    data.LastPage,
                );
                this.setGridState({ingredients: data.ListData});
            }
        );
    }

    private handleCheckStock(uuid: IIngredientUses['ingredient_uuid']): void {
        IngredientUsesProvider.checkTotalStock(uuid, (data) => {
            this.setFormState({
                stock: data,
            })
        })
    }


    private saveProduct(): void {
        if (this.state.form.ingredient_uuid === '') {
            toaster.danger("Product title can not be empty!");
            return;
        }

        if (this.state.form.stock < this.state.form.quantity) {
            toaster.danger('Quantity can not be over ' + this.state.form.stock);
            return;
        }

        IngredientUsesProvider.saveIngredientUses(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getProducts();
        });
    }



    componentDidMount(): void {
        this.getProducts();
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
                                    moduleTitle={"Ingredient Uses List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />

                                <IngredientUsesGridScreen
                                    gridData={this.state.grid}
                                    formData={this.state.form}
                                    onReload={this.getProducts}
                                    onView={(data) => this.setViewState({
                                        open: true,
                                        data,
                                    })}
                                    onDelete={(uuid) => {
                                        if (window.confirm("Are you sure?")) {
                                            IngredientUsesProvider.deleteIngredient(uuid, (data) => {
                                                toaster.success(data.message);
                                                this.getProducts();
                                            })
                                        }
                                    }}
                                    onEdit={(item) => {
                                        this.setFormState({
                                            uuid: item.uuid,
                                            open: true,
                                            date: item.date,
                                            ingredient_uuid: item.ingredient_uuid,
                                            quantity: item.quantity,
                                        }, () => this.handleCheckStock(item.ingredient_uuid))
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

                                <IngredientUsesFormScreen
                                    formData={this.state.form}
                                    onFormStateChange={this.setFormState}
                                    onFormClose={this.resetFormState}
                                    onFormSubmit={this.saveProduct}
                                    checkStock={this.handleCheckStock}
                                />

                                <IngredientUsesViewScreen
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

export default IngredientUsesView;
