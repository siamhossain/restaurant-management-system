import React, {Fragment, ReactElement} from 'react';
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import View from "@/Components/Base/View";
import {IIngredient} from "@/App/Interfaces/Models";
import {IngredientProvider} from "@/App/Services/Providers/Modules/Admin";
import {IIngredientPurchaseViewProps} from "@/Views/Private/Admin/IngredientPurchase/IngredientPurchase.View";

export interface IIngredientStockViewProps {

}

export interface IIngredientStockViewState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        total_stock: IIngredient[],
        filter: {
            search: string,
        }
    }

    form: {
        code: string
        open: boolean,
    }

    view: {
        open: boolean,
        data: Partial<IIngredient>
    }

    additional: {}
}
class IngredientStockView extends View<IIngredientStockViewProps, IIngredientStockViewState> {
    constructor(props: IIngredientPurchaseViewProps) {
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

                total_stock: [],
                filter: {
                    search: ''
                }
            },

            form: {
                code: '',
                open: false,
            },

            view: {
                data: {},
                open: false,
            },

            additional: {}
        };

        this.state = this.initialState;
        this.getPurchaseOrders = this.getPurchaseOrders.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getPurchaseOrders);
    }

    private getPurchaseOrders(): void {
        IngredientProvider.getTotalStock(
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
                this.setGridState({total_stock: data.ListData});
            });
    }




    public componentDidMount(): void {
        this.getPurchaseOrders();
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
                                    moduleTitle={"Ingredient Stock"}

                                />
                            </div>
                        </div>

                    </div>

                </MainLayout>
            </Fragment>
        );
    }
}

export default IngredientStockView;
