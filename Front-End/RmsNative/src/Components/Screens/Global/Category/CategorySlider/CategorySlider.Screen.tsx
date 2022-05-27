import React, { Fragment, ReactElement } from 'react';
import {View, ScrollView} from "react-native";
import {CategorySliderStyleSheet} from "@/Static/StyleSheets/Global/Category/CategorySlider";
import {CategoryItemScreen} from "@/Components/Screens/Global/Category/CategoryItem";
import PizzaImage from "@/Static/Images/Global/img_pizza.png";
import BurgerImage from "@/Static/Images/Global/img_burger.png";
import ChickenImage from "@/Static/Images/Global/img_chicken.png";
import DrinkImage from "@/Static/Images/Global/img_drinks.png";

const CategorySliderScreen = (): ReactElement => {
    return (
        <Fragment>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={CategorySliderStyleSheet.root}>
                <CategoryItemScreen imageSrc={PizzaImage} title={"Pizza"}/>
                <CategoryItemScreen imageSrc={BurgerImage} title={"Burger"}/>
                <CategoryItemScreen imageSrc={ChickenImage} title={"Chicken"}/>
                <CategoryItemScreen imageSrc={DrinkImage} title={"Drink"}/>
                <CategoryItemScreen imageSrc={PizzaImage} title={"Pizza"}/>
                <CategoryItemScreen imageSrc={BurgerImage} title={"Burger"}/>
            </ScrollView>


        </Fragment>
    );
};

export { CategorySliderScreen };
