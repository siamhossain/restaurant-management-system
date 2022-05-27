import React, { Fragment, ReactElement } from 'react';
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/Footer";
import {HeadlineBannerScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/HeadlineBanner";
import {FoodItemsScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/FoodItems";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import Grid from "@material-ui/core/Grid";
import {SpecialMenuCardScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/SpecialMenu";
import BaconBurgerImage from "@/Static/Images/StoreFront/PlutoKitchen/SpecialMenu/img_bacon_burger.png";
import {css} from "@emotion/css";


const __css_food_categories = css`
        
        
  .category-product-wrapper {
    margin-bottom: 50px;
    
    .food-menu-title {
      margin-bottom: 50px;
    }
  }

  .food-menu-title {
    color: #fe9400;
    font-size: 25px;
  }
        
`;

const CategoryListView = (): ReactElement => {
    return (
        <Fragment>
            <HeaderScreen/>
            <HeadlineBannerScreen title={"Categories"} sub_title={"categories"} />
            <div className={__css_food_categories}>
                <div className="top-categories">
                    <h1 className={CommonStyleSheet.classes.container} style={{color: '#fe9400',fontSize: 25,marginTop: "80px",marginBottom: "0"}}>Fast Food</h1>
                    <FoodItemsScreen/>
                    <div className={CommonStyleSheet.classes.container}>
                        <div className="category-product-wrapper">
                            <h1 className="food-menu-title">Products in Fast Food</h1>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <SpecialMenuCardScreen src={BaconBurgerImage} menu_name={"Bacon Burger"} price={"300"} compare_at_price={"350"}/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <SpecialMenuCardScreen src={BaconBurgerImage} menu_name={"Bacon Burger"} price={"300"} compare_at_price={"350"}/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <SpecialMenuCardScreen src={BaconBurgerImage} menu_name={"Bacon Burger"} price={"300"} compare_at_price={"350"}/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <SpecialMenuCardScreen src={BaconBurgerImage} menu_name={"Bacon Burger"} price={"300"} compare_at_price={"350"}/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <SpecialMenuCardScreen src={BaconBurgerImage} menu_name={"Bacon Burger"} price={"300"} compare_at_price={"350"}/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <SpecialMenuCardScreen src={BaconBurgerImage} menu_name={"Bacon Burger"} price={"300"} compare_at_price={"350"}/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <SpecialMenuCardScreen src={BaconBurgerImage} menu_name={"Bacon Burger"} price={"300"} compare_at_price={"350"}/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <SpecialMenuCardScreen src={BaconBurgerImage} menu_name={"Bacon Burger"} price={"300"} compare_at_price={"350"}/>
                                </Grid>
                            </Grid>


                        </div>
                    </div>
                </div>
            </div>
            <FooterScreen/>
        </Fragment>
    );
};

export default CategoryListView;
