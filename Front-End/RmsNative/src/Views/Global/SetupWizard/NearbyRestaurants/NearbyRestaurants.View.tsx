import React, { Fragment, ReactElement } from 'react';
import {Text, View, Image, ScrollView} from "react-native";
import {NearbyRestaurantsStyleSheet} from "@/Static/StyleSheets/Global/SetupWizard";
import NearRestaurantImage from "@/Static/Images/Global/img_near_by_restaurants.png"
import {NavigationScreen} from "@/Components/Screens/Global/SetupWizard";
import {useNavigation} from "@react-navigation/core";
import {GLOBAL_ROUTES} from "@/Routes";

const NearbyRestaurantsView = (): ReactElement => {
    const navigation: any = useNavigation();

    return (
        <Fragment>
            <ScrollView>
                <View style={NearbyRestaurantsStyleSheet.SetupContainer}>
                    <View style={NearbyRestaurantsStyleSheet.imageContainer}>
                        <Image
                            source={NearRestaurantImage}
                            style={NearbyRestaurantsStyleSheet.nearRestaurantImage}
                        />
                    </View>
                    <View style={NearbyRestaurantsStyleSheet.nearRestaurantInfo}>
                        <Text style={NearbyRestaurantsStyleSheet.nearRestaurantTitle}>
                            {"Nearby Restaurants"}

                        </Text>
                        <Text style={NearbyRestaurantsStyleSheet.restaurantInfo}>
                            {"You don`t have to go far to find a good restaurant,we have provided all the restaurant that is near you"}

                        </Text>
                    </View>
                </View>
                <NavigationScreen
                    totalSteps={3}
                    activeStep={1}
                    onPressNext={() => navigation.navigate(GLOBAL_ROUTES.SETUP_WIZARD.STEP2)}
                />
            </ScrollView>
        </Fragment>
    );
};

export default NearbyRestaurantsView;
