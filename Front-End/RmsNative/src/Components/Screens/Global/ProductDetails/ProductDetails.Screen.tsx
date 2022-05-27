import React, {Fragment, ReactElement} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import BurgerBigImage from "@/Static/Images/Global/img_burger_big.png"
import BurgerSmallImage from "@/Static/Images/Global/img_burger_small1.png"
import {ProductDetailsStyleSheet} from "@/Static/StyleSheets/Global/ProductDetails";
import AntIcon from "react-native-vector-icons/AntDesign";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {GLOBAL_ROUTES, PRIVATE_ROUTES, PUBLIC_ROUTES} from "@/Routes";
import {useNavigation} from "@react-navigation/core";

export interface IProductDetailsProps {

}

export interface IProductDetailsState {

}

const ProductDetailsScreen = (): ReactElement => {
    const navigation: any = useNavigation();
    return (
        <Fragment>
            <ScrollView>
                <View style={ProductDetailsStyleSheet.productDetailsContainer}>
                    <View style={ProductDetailsStyleSheet.productDetailsBigImageBg}>
                        <Image
                            source={BurgerBigImage}
                            style={ProductDetailsStyleSheet.productDetailsBigImage}
                        />
                    </View>
                    <View style={ProductDetailsStyleSheet.productDetailsSmall}>
                        <View style={ProductDetailsStyleSheet.productDetailsSmallImageBg}>
                            <Image
                                source={BurgerSmallImage}
                                style={ProductDetailsStyleSheet.productDetailsSmallImage}
                            />
                        </View>
                        <View style={ProductDetailsStyleSheet.productDetailsSmallImageBgChange}>
                            <Image
                                source={BurgerSmallImage}
                                style={ProductDetailsStyleSheet.productDetailsSmallImage}
                            />
                        </View>
                    </View>
                    <View style={ProductDetailsStyleSheet.productTitleContainer}>
                        <Text style={ProductDetailsStyleSheet.productTitleText}>
                            {"Bacon Burger"}
                        </Text>
                        <Text style={ProductDetailsStyleSheet.productTitleTextDetail}>
                            {"a mighty meaty double helping of all the reasons you love our burger"}
                        </Text>
                    </View>
                    <View style={ProductDetailsStyleSheet.productPrice}>
                        <Text style={ProductDetailsStyleSheet.productPriceText}>
                            {"300 ৳"}
                        </Text>
                    </View>
                    <View style={ProductDetailsStyleSheet.productInfo}>
                        <Text style={ProductDetailsStyleSheet.productInfoText}>

                            {"1. Free global shipping on all orders"}
                        </Text>
                        <Text style={ProductDetailsStyleSheet.productInfoText}>
                            {"2. Free global shipping on all orders"}
                        </Text>
                        <Text style={ProductDetailsStyleSheet.productInfoText}>
                            {"3. Free global shipping on all orders"}
                        </Text>
                    </View>
                    <View style={ProductDetailsStyleSheet.productCounter}>
                        <View style={ProductDetailsStyleSheet.productDecrease}>
                            <TouchableOpacity>
                                <AntIcon name={"minus"} size={20} color={"#000000"}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={ProductDetailsStyleSheet.productNumber}>
                            {"1"}
                        </Text>
                        <View style={ProductDetailsStyleSheet.productIncrease}>
                            <TouchableOpacity>
                                <AntIcon name={"plus"} size={20} color={"#FA4A0C"}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={ProductDetailsStyleSheet.productButtonCart}>
                        <TouchableOpacity
                            onPress={() =>navigation.navigate(GLOBAL_ROUTES.PRODUCT_CART)}>
                            <PrimaryButton
                                label={"GO To Cart"}
                               /* onPress={() => (
                                    PUBLIC_ROUTES.NEW_PASSWORD_SUCCESS
                                )}*/
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Fragment>
    );
};

export {ProductDetailsScreen};
