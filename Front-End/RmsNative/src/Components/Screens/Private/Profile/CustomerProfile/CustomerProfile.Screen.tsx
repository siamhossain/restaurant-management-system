import React, { Fragment, ReactElement } from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from "react-native";
import AvatarImage from "@/Static/Images/Private/img_avatar_profile.png"
import {CustomerProfileScreenStyleSheet} from "@/Static/StyleSheets/Private/Profile";
import AntIcon from "react-native-vector-icons/AntDesign";
import {PRIVATE_ROUTES, PUBLIC_ROUTES, ROUTES} from "@/Routes";
import {useNavigation} from "@react-navigation/core";

export interface ICustomerProfileProps {

}

export interface ICustomerProfileState {

}

const CustomerProfileScreen = (): ReactElement => {
    const navigation: any = useNavigation();
    return (
        <Fragment>
            <ScrollView>
                <View style={CustomerProfileScreenStyleSheet.root}>
                    <View style={CustomerProfileScreenStyleSheet.profileTitleContainer}>
                        <Text style={CustomerProfileScreenStyleSheet.title}>
                            {"My Profile"}
                        </Text>
                    </View>

                    <View style={CustomerProfileScreenStyleSheet.profileContainer}>
                        <TouchableOpacity>
                            <Text style={CustomerProfileScreenStyleSheet.edit}>
                                {"Edit"}
                            </Text>
                        </TouchableOpacity>
                        <View style={CustomerProfileScreenStyleSheet.avatarContainer}>
                            <Image source={AvatarImage} style={CustomerProfileScreenStyleSheet.avatarImage}/>
                            <View>
                                <Text style={CustomerProfileScreenStyleSheet.profileName}>
                                    {"Md. Arif Ahmed"}
                                </Text>
                                <Text style={CustomerProfileScreenStyleSheet.profileEmail}>
                                    {"Arif@gmail.com"}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={CustomerProfileScreenStyleSheet.profileMenuContainer}>
                        <TouchableOpacity style={CustomerProfileScreenStyleSheet.menuItem}
                                          onPress={() =>navigation.navigate(PRIVATE_ROUTES.MY_PROFILE)}>
                            <Text style={CustomerProfileScreenStyleSheet.profileDetails}>
                                {"CustomerAbout"}
                            </Text>
                            <AntIcon name={"right"} size={15} style={{color: "#A6A6A6"}} />
                        </TouchableOpacity>

                        <TouchableOpacity style={CustomerProfileScreenStyleSheet.menuItem}>
                            <Text style={CustomerProfileScreenStyleSheet.profileDetails}
                                  onPress={() =>navigation.navigate(PRIVATE_ROUTES.CUSTOMER_ORDER_LIST)}>
                                {"orders"}
                            </Text>
                            <AntIcon name={"right"} size={15} style={{color: "#A6A6A6"}} />
                        </TouchableOpacity>

                        <TouchableOpacity style={CustomerProfileScreenStyleSheet.menuItem}
                                          onPress={() =>navigation.navigate(PRIVATE_ROUTES.CUSTOMER_ADDRESS)}>
                            <Text style={CustomerProfileScreenStyleSheet.profileDetails}>
                                {"Address"}
                            </Text>
                            <AntIcon name={"right"} size={15} style={{color: "#A6A6A6"}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={CustomerProfileScreenStyleSheet.menuItem}
                                          onPress={() =>navigation.navigate(PRIVATE_ROUTES.CUSTOMER_ORDER_DETAILS)}>
                            <Text style={CustomerProfileScreenStyleSheet.profileDetails}>
                                {"Order Details"}
                            </Text>
                            <AntIcon name={"right"} size={15} style={{color: "#A6A6A6"}} />
                        </TouchableOpacity>

                        <TouchableOpacity style={CustomerProfileScreenStyleSheet.menuItem}
                                          onPress={() =>navigation.navigate(ROUTES.GLOBAL.PRODUCT_DETAILS)}>
                            <Text style={CustomerProfileScreenStyleSheet.profileDetails}>
                                {"Product Details"}
                            </Text>
                            <AntIcon name={"right"} size={15} style={{color: "#A6A6A6"}} />
                        </TouchableOpacity>

                        <TouchableOpacity style={CustomerProfileScreenStyleSheet.menuItem}
                                          onPress={() => navigation.navigate(PUBLIC_ROUTES.LOGIN)}>
                            <Text style={CustomerProfileScreenStyleSheet.profileDetails}>
                                {"Logout"}
                            </Text>
                            <AntIcon name={"right"} size={15} style={{color: "#A6A6A6"}} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Fragment>
    );
};

export { CustomerProfileScreen };
