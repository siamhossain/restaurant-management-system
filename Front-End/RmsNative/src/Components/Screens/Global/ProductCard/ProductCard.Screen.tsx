import React, { Fragment, ReactElement } from 'react';
import {Image, ImageSourcePropType, Text, TouchableOpacity, View} from "react-native";
import {ProductCardStyleSheet} from "@/Static/StyleSheets/Global/ProductCard";
import {useNavigation} from "@react-navigation/core";
import {ROUTES} from "@/Routes";
interface IProductCardScreenProps {
    imageSrc: ImageSourcePropType,
    title: string,
    price: string,
}

const ProductCardScreen: React.FC<IProductCardScreenProps> = (props): ReactElement => {
    const navigation: any = useNavigation();
    return (
        <Fragment>
            <TouchableOpacity
                onPress={() =>navigation.navigate(ROUTES.GLOBAL.PRODUCT_DETAILS)}
                activeOpacity={0.8}
                style={ProductCardStyleSheet.root}>
                <View style={ProductCardStyleSheet.productContainer}>
                    <View style={ProductCardStyleSheet.productImageContainer}>
                        <Image source={props.imageSrc} style={ProductCardStyleSheet.productImage} />
                    </View>

                    <View style={ProductCardStyleSheet.titleContainer}>
                        <View style={{flex: 1, paddingRight: 2}}>
                            <Text style={ProductCardStyleSheet.productTitle}>
                                {props.title}
                            </Text>
                        </View>

                        <View>
                            <Text style={ProductCardStyleSheet.price}>
                                {props.price}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Fragment>
    );
};

export { ProductCardScreen };
