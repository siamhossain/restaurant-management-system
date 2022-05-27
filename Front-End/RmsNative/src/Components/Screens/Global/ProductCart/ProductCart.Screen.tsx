import React, { Fragment, ReactElement } from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {ProductCartStyleSheet} from "@/Static/StyleSheets/Global/ProductCart";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {ColorsConfig} from "@/App/Config/Theme/Colors";
import DoubleDeckerBurgerImage from "@/Static/Images/Global/double_dekar.png"
import BeefBurgerImage from "@/Static/Images/Global/beef_burger.png"
import AntIcon from "react-native-vector-icons/AntDesign";
import {useNavigation} from "@react-navigation/core";
import {GLOBAL_ROUTES} from "@/Routes";

export interface IProductCartProps {

}

export interface IProductCartState {

}
const ProductCartScreen = (): ReactElement => {
    const [quantity, setQuantity] = React.useState(0);
    const navigation: any = useNavigation();
    return (
        <Fragment>
            <ScrollView>
                <View style={ProductCartStyleSheet.productItemContainer}>
                    <View style={ProductCartStyleSheet.productItem}>
                        <View style={ProductCartStyleSheet.allProduct}>
                            <View style={ProductCartStyleSheet.burgerImage}>
                                  <Image
                                source={DoubleDeckerBurgerImage}
                                style={ProductCartStyleSheet.image}
                            />
                            </View>
                            <View style={ProductCartStyleSheet.productItemDetails}>
                                <Text style={ProductCartStyleSheet.proName}>
                                    {"Double Decker...."}
                                </Text>
                                <View style={ProductCartStyleSheet.productCounter}>
                                    <View style={ProductCartStyleSheet.counter}>
                                        <TouchableOpacity>
                                            <AntIcon  onPress={() => setQuantity(quantity + 1)} name={"minus"} size={20} color={"#000000"}/>
                                        </TouchableOpacity>
                                        <Text style={ProductCartStyleSheet.productNumber}>
                                            {"2"}
                                        </Text>
                                        <TouchableOpacity>
                                            <AntIcon onPress={() => setQuantity(quantity - 1)} name={"plus"} size={20} color={"#000000"}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={ProductCartStyleSheet.singleProductItemPrice}>
                                <View style={ProductCartStyleSheet.icon}>
                                    <TouchableOpacity>
                                        <AntIcon name={"close"} size={25} color={"#C8161D"}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={ProductCartStyleSheet.itemPrice}>
                                    <Text style={ProductCartStyleSheet.price}>
                                        {"$41.90"}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={ProductCartStyleSheet.productItem}>
                        <View style={ProductCartStyleSheet.allProduct}>
                            <View style={ProductCartStyleSheet.burgerImage}>
                                <Image
                                    source={BeefBurgerImage}
                                    style={ProductCartStyleSheet.image}
                                />
                            </View>
                            <View style={ProductCartStyleSheet.productItemDetails}>
                                <Text style={ProductCartStyleSheet.proName}>
                                    {"Beef Burger With.."}
                                </Text>
                                <View style={ProductCartStyleSheet.productCounter}>
                                    <View style={ProductCartStyleSheet.counter}>
                                        <TouchableOpacity>
                                            <AntIcon name={"minus"} size={20} color={"#000000"}/>
                                        </TouchableOpacity>

                                        <Text style={ProductCartStyleSheet.productNumber}>
                                            {"1"}
                                        </Text>
                                        <TouchableOpacity>
                                            <AntIcon name={"plus"} size={20} color={"#000000"}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={ProductCartStyleSheet.singleProductItemPrice}>
                                <View style={ProductCartStyleSheet.icon}>
                                    <TouchableOpacity>
                                        <AntIcon name={"close"} size={25} color={"#C8161D"}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={ProductCartStyleSheet.itemPrice}>
                                    <Text style={ProductCartStyleSheet.price}>
                                        {"$20.95"}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={ProductCartStyleSheet.applyCouponButton}>
                        <TouchableOpacity
                            onPress={() => {}
                            }>
                            <PrimaryButton
                                label={"Apply Coupon"}
                                style={{backgroundColor: ColorsConfig.shippingAddressAddButton.bgColor}}
                                labelStyle={{color: ColorsConfig.shippingAddressAddButton.textColor}}
                            />
                        </TouchableOpacity>
                        <View style={ProductCartStyleSheet.productInfoContainer}>
                            <View style={ProductCartStyleSheet.productInfo}>
                                <Text style={ProductCartStyleSheet.productItemName}>
                                    {"ItemTotal"}
                                </Text>
                                <Text style={ProductCartStyleSheet.productItemPrice}>
                                    {"$62.68"}
                                </Text>
                            </View>
                            <View style={ProductCartStyleSheet.productInfo}>
                                <Text style={ProductCartStyleSheet.productItemName}>
                                    {"Delivery Charge"}
                                </Text>
                                <Text style={ProductCartStyleSheet.productItemPrice}>
                                    {"$2.25"}
                                </Text>
                            </View>
                            <View style={ProductCartStyleSheet.productInfo}>
                                <Text style={ProductCartStyleSheet.productItemName}>
                                    {"Tax"}
                                </Text>
                                <Text style={ProductCartStyleSheet.productItemPrice}>
                                    {"$0.2"}
                                </Text>
                            </View>
                            <View style={ProductCartStyleSheet.productInfo}>
                                <Text style={ProductCartStyleSheet.productItemName}>
                                    {"Total:"}
                                </Text>
                                <Text style={ProductCartStyleSheet.productItemPrice}>
                                    {"$65.35"}
                                </Text>
                            </View>
                        </View>
                        <View style={ProductCartStyleSheet.proceedPaymentMethodButton}>
                            <TouchableOpacity
                                onPress={() =>navigation.navigate(GLOBAL_ROUTES.PAYMENT_METHOD)}>
                                <PrimaryButton
                                    label={"Proceed to Payment Method"}
                                   /* onPress={() => {
                                    }}*/
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Fragment>
    );
};

export { ProductCartScreen };

/*
style={{backgroundColor: ColorsConfig.shippingAddressAddButton.bgColor}}
labelStyle={{color: ColorsConfig.shippingAddressAddButton.textColor}}
*/
