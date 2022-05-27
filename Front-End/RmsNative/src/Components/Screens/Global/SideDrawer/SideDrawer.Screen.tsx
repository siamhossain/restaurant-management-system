import React, {Fragment, ReactElement} from 'react';
import {Image, ScrollView, View} from "react-native";
import HomePageIcon from "@/Static/Icons/ic_coolicon.png"
import PopularIcon from "@/Static/Icons/ic-popular.png"
import OrderIcon from "@/Static/Icons/ic_order.png"
import RestaurantDetailsIcon from "@/Static/Icons/ic_restaurent_details.png"
import PaymentIcon from "@/Static/Icons/ic_payment.png"
import ProfileIcon from "@/Static/Icons/ic_profile.png"
import CheckoutIcon from "@/Static/Icons/ic_checkout.png"
import LogoutIcon from "@/Static/Icons/ic_logout.png"
import LogoImage from "@/Static/Images/Public/img_login_bag.png";
import {List} from 'react-native-paper';
import {SideDrawerStyleSheet} from "@/Static/StyleSheets/Global/SideDrawer";
interface IListItemProps {
    title: string,
    icon: any,
    onPress?(): void
}

const ListItem = ({title, icon, onPress}: IListItemProps) => (
    <List.Item
        title={title}
        left={() => <View style={SideDrawerStyleSheet.listItemIconContainer}>
            <Image source={icon} style={SideDrawerStyleSheet.listItemIcon}/>
        </View>}
        onPress={onPress}
        titleStyle={SideDrawerStyleSheet.listItemTitle}
    />
);

const SideDrawerScreen = (): ReactElement => {
    return (
        <Fragment>
            <ScrollView>
               {/* <View style={SideDrawerStyleSheet.logoContainer}>
                    <Image
                        source={LogoImage}
                        style={SideDrawerStyleSheet.logoImage}
                    />
                </View>*/}
             {/*   <View style={SideDrawerStyleSheet.sideDrawerContainer}>

                    <View style={SideDrawerStyleSheet.sideDrawerMenuItem}>
                        <ListItem
                            icon={HomePageIcon}
                            title={"HomePageIcon"}
                            onPress={() => alert("Pressed!")}
                        />

                        <ListItem
                            icon={PopularIcon}
                            title={"PopularIcon"}
                            onPress={() => alert("Pressed!")}
                        />

                        <ListItem
                            icon={OrderIcon}
                            title={"Order"}
                            onPress={() => alert("Pressed!")}
                        />

                        <ListItem
                            icon={RestaurantDetailsIcon}
                            title={"RestaurantDetails"}
                            onPress={() => alert("Pressed!")}
                        />

                        <ListItem
                            icon={PaymentIcon}
                            title={"Payment"}
                            onPress={() => alert("Pressed!")}
                        />

                        <ListItem
                            icon={ProfileIcon}
                            title={"Profile"}
                            onPress={() => alert("Pressed!")}
                        />

                        <ListItem
                            icon={CheckoutIcon}
                            title={"Checkout"}
                            onPress={() => alert("Pressed!")}
                        />

                        <ListItem
                            icon={LogoutIcon}
                            title={"Logout"}
                            onPress={() => alert("Pressed!")}
                        />
                    </View>
                </View>*/}
            </ScrollView>
        </Fragment>
    );
};


export {SideDrawerScreen};
