import React, { Fragment, ReactElement } from 'react';
import {View} from "react-native";
import {ProductCardScreen} from "@/Components/Screens/Global/ProductCard";
import BurgerImage from "@/Static/Images/Global/img_becon_burger.png";

const ProductListScreen = (): ReactElement => {

    return (
        <Fragment>
            <View style={{
                flex: 1,
                flexDirection: "row",
                borderColor: "red",
                borderWidth: 0,
                flexWrap: "wrap",
                marginLeft: -10,
                marginRight: -10,
            }}>
                <ProductCardScreen imageSrc={BurgerImage} title={"Special Naga Burger"} price={"50 Tk"}/>
                <ProductCardScreen imageSrc={BurgerImage} title={"Special Naga Burger"} price={"50 Tk"}/>
                <ProductCardScreen imageSrc={BurgerImage} title={"Special Naga Burger"} price={"50 Tk"}/>
                <ProductCardScreen imageSrc={BurgerImage} title={"Special Naga Burger"} price={"50 Tk"}/>
                <ProductCardScreen imageSrc={BurgerImage} title={"Special Naga Burger"} price={"50 Tk"}/>
                <ProductCardScreen imageSrc={BurgerImage} title={"Special Naga Burger"} price={"50 Tk"}/>
            </View>


            {/*<View style={{
                flexDirection:'row',flex:6
            }}>

                <View style={{flex:2,flexDirection:"row",justifyContent:'space-between', marginBottom: 10}}>
                    <ProductCardScreen />
                </View>
                <View style={{flex:2,flexDirection:"row",justifyContent:'space-between', marginBottom: 10}}>
                    <ProductCardScreen />
                </View>

            </View>*/}
        </Fragment>
    );
};

export { ProductListScreen };
