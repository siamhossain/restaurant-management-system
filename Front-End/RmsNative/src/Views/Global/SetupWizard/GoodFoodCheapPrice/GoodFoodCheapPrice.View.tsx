import React, { Fragment, ReactElement } from 'react';
import {View, Text, Image, ScrollView} from "react-native";
import {GoodFoodCheapPriceStyleSheet} from "@/Static/StyleSheets/Global/SetupWizard";
import GoodFoodCheapPriceImage from "@/Static/Images/Global/img_good_food.png";
import {GLOBAL_ROUTES} from "@/Routes";
import {NavigationScreen} from "@/Components/Screens/Global/SetupWizard";
import {useNavigation} from "@react-navigation/core";

const GoodFoodCheapPriceView = (): ReactElement => {
    const navigation: any = useNavigation();

    return (
        <Fragment>
            <ScrollView>
            <View style={GoodFoodCheapPriceStyleSheet.setup2Container}>
                <View style={GoodFoodCheapPriceStyleSheet.setup2imageContainer}>
                    <Image
                        source={GoodFoodCheapPriceImage}
                        style={GoodFoodCheapPriceStyleSheet.goodFoodCheapPriceImage}
                    />
                </View>
                <View style={GoodFoodCheapPriceStyleSheet.nearRestaurantInfo}>
                    <Text style={GoodFoodCheapPriceStyleSheet.nearRestaurantTitle}>
                        {"Good food at a cheap price"}
                    </Text>
                    <Text style={GoodFoodCheapPriceStyleSheet.restaurantInfo}>
                        {"You can eat at expensive restaurants with affordable price"}
                    </Text>
                </View>
            </View>

            <NavigationScreen
                totalSteps={3}
                activeStep={3}
                onPressNext={() => navigation.navigate(GLOBAL_ROUTES.ROOT)}
            />
            </ScrollView>
        </Fragment>
    );
};

export default GoodFoodCheapPriceView;
