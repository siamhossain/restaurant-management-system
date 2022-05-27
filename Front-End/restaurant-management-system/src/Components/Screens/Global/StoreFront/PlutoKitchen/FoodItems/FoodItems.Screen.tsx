import React, { Fragment, ReactElement } from 'react';
import {FoodItemsStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/FoodItems";
import Grid from "@material-ui/core/Grid";
import BurgerImage from "@/Static/Images/StoreFront/PlutoKitchen/FoodItems/burger-img.png";
import ChickenImage from "@/Static/Images/StoreFront/PlutoKitchen/FoodItems/chicken-img.png";
import DesertImage from "@/Static/Images/StoreFront/PlutoKitchen/FoodItems/desert-img.png";
import DrinkImage from "@/Static/Images/StoreFront/PlutoKitchen/FoodItems/drinks-img.png";
import PizzaImage from "@/Static/Images/StoreFront/PlutoKitchen/FoodItems/pizza-img.png";
import SetMenuImage from "@/Static/Images/StoreFront/PlutoKitchen/FoodItems/set-menu-img.png";
import {SingleFoodItemScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/FoodItems/SingleFoodItem";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";


const FoodItemsScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={FoodItemsStyleSheet.classes.root}>
                <div className={CommonStyleSheet.classes.container}>
                    <div className="image-background">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={2}>
                                <SingleFoodItemScreen
                                    src={BurgerImage}
                                    food_name={"Burger"}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={4} xl={2}>
                                <SingleFoodItemScreen
                                    src={ChickenImage}
                                    food_name={"Chicken"}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={4} xl={2}>
                                <SingleFoodItemScreen
                                    src={DesertImage}
                                    food_name={"Desert"}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={4} xl={2}>
                                <SingleFoodItemScreen
                                    src={DrinkImage}
                                    food_name={"Drink"}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={4} xl={2}>
                                <SingleFoodItemScreen
                                    src={PizzaImage}
                                    food_name={"Pizza"}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={4} xl={2}>
                                <SingleFoodItemScreen
                                    src={SetMenuImage}
                                    food_name={"SetMenu"}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { FoodItemsScreen };
