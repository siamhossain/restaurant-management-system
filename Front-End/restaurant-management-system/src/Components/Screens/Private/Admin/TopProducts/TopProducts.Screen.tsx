import React, { Fragment, ReactElement } from 'react';
import Grid from "@material-ui/core/Grid";
import {TopProductCardScreen} from "@/Components/Screens/Private/Admin/TopProducts/TopProductCard.Screen";
import Pizza from "@/Static/Images/StoreFront/PlutoKitchen/Dashboard/Pizza.jpg";
import Chicken from "@/Static/Images/StoreFront/PlutoKitchen/Dashboard/Chicken.jpg";
import Burger from "@/Static/Images/StoreFront/PlutoKitchen/Dashboard/burger.jpg";
import Biriyani from "@/Static/Images/StoreFront/PlutoKitchen/Dashboard/biriyani.jpg";
import View from "@/Components/Base/View";
import {IDashboardBannerScreenProps} from "@/Components/Screens/Private/Admin/DashboardBanner";
import {DashboardProvider} from "@/App/Services/Providers/Modules/Admin";

export interface ITopProductsScreenProps {

}

export interface ITopProductsScreenState {
    grid: {
        dialog_open: boolean,
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        top_products: [],
    },
    form : {

    },
    view: {},
    additional: {},
}
class TopProductsScreen extends View<ITopProductsScreenProps, ITopProductsScreenState> {
    constructor(props:ITopProductsScreenProps) {
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

                top_products: [],
                filter: {
                    search: ''
                }
            },
            form: {

            },

            view: {},
            additional: {},
        }

        this.state = this.initialState;
        this.getTopProduct = this.getTopProduct.bind(this);
    }

    private getTopProduct(): void {
        DashboardProvider.getTopProducts((data) => {
            this.setGridState({
                top_products: data,
            })
        })
    }

    componentDidMount(): void {
        this.getTopProduct();
    }

    render(): ReactElement {
        return (
            <Fragment>
                <div className="top-product-section">
                    <Grid container spacing={3}>
                        {this.state.grid.top_products.map((item: any, index) => (
                            <Grid key={index} item xs={12} sm={12} md={6} lg={3} xl={3}>
                                <TopProductCardScreen bg_img={item.featured_image_uri} product_name={item.title} weekly_sales={item.total_sales}/>
                            </Grid>
                        ))}


                    </Grid>
                </div>
            </Fragment>
        );
    }
}

export { TopProductsScreen };
