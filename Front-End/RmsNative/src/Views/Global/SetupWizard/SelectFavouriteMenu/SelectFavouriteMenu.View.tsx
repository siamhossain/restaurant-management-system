import React, { Fragment, ReactElement } from 'react';
import {Image, ScrollView, Text, View} from "react-native";
import SelectFavouriteMenuImage from "@/Static/Images/Global/img_select_fav_menu.png";
import {SelectFavouriteMenuStyleSheet} from "@/Static/StyleSheets/Global/SetupWizard";
import {NavigationScreen} from "@/Components/Screens/Global/SetupWizard";
import {GLOBAL_ROUTES} from "@/Routes";
import {useNavigation} from "@react-navigation/core";

const SelectFavouriteMenuView = (): ReactElement => {
    const navigation: any = useNavigation();

    return (
        <Fragment>
            <ScrollView>
                <View style={SelectFavouriteMenuStyleSheet.setup2Container}>
                    <View style={SelectFavouriteMenuStyleSheet.setup2imageContainer}>
                        <Image
                            source={SelectFavouriteMenuImage}
                            style={SelectFavouriteMenuStyleSheet.selectFavouriteMenuImage}
                        />
                    </View>
                    <View style={SelectFavouriteMenuStyleSheet.nearRestaurantInfo}>
                        <Text style={SelectFavouriteMenuStyleSheet.nearRestaurantTitle}>
                            {"Select the Favourites Menu"}
                        </Text>
                        <Text style={SelectFavouriteMenuStyleSheet.restaurantInfoText}>
                            {"Now eat well don't leave the house,You can choose your favorite food only with one click"}
                        </Text>
                    </View>
                </View>

                <NavigationScreen
                    totalSteps={3}
                    activeStep={2}
                    onPressNext={() => navigation.navigate(GLOBAL_ROUTES.SETUP_WIZARD.STEP3)}
                />
            </ScrollView>
        </Fragment>
    );
};

export default SelectFavouriteMenuView;
