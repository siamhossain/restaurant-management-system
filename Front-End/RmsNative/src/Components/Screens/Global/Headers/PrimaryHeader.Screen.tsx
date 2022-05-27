import React, {Fragment, ReactElement} from 'react';
import {View, Text, Image, TouchableOpacity, ImageSourcePropType, ScrollView, ViewStyle} from "react-native";
import {IconButton} from 'react-native-paper';
import {PrimaryHeaderStyleSheet} from "@/Static/StyleSheets/Global/Headers";
import MenuIcon from "@/Static/Icons/ic_menu.png"
import ProfileAvatarPlaceholderImage from "@/Static/Images/Global/img_avatar_placeholder.png";
import {ColorsConfig} from "@/App/Config/Theme/Colors";
import {PUBLIC_ROUTES, ROUTES} from "@/Routes";
import {useNavigation} from "@react-navigation/core";

export interface PrimaryHeaderScreenProps {
    title?: {
        text?: string,
        image?: ImageSourcePropType,
    },
    style?: ViewStyle,
}

const PrimaryHeaderScreen: React.FC<PrimaryHeaderScreenProps> = (props): ReactElement => {
    const navigation: any = useNavigation();
    return (
        <Fragment>
            <View style={PrimaryHeaderStyleSheet.root}>
                <View style={PrimaryHeaderStyleSheet.menuContainer}>
                    <IconButton
                        icon={() => <Image
                            source={MenuIcon}
                            style={PrimaryHeaderStyleSheet.menuIcon}
                        />}
                        color={ColorsConfig.primary}
                        size={20}
                        onPress={() => alert("Menu Clicked!")}
                    />
                </View>

                <View style={PrimaryHeaderStyleSheet.middleContentContainer}>
                    {props.title && (
                        <View style={PrimaryHeaderStyleSheet.middleContentWrapper}>
                            <Text style={PrimaryHeaderStyleSheet.titleText}>{props.title?.text}</Text>
                            {props.title?.image && (
                                <Image source={props.title?.image} style={PrimaryHeaderStyleSheet.titleImage}/>
                            )}
                        </View>
                    )}
                </View>

                <View style={PrimaryHeaderStyleSheet.profileAvatarContainer}>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{borderRadius: 10}}
                        onPress={() => navigation.navigate(ROUTES.PRIVATE.CUSTOMER_PROFILE)}>
                        <Image
                            source={ProfileAvatarPlaceholderImage}
                            style={PrimaryHeaderStyleSheet.avatarPlaceholder}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Fragment>
    );
};

export {PrimaryHeaderScreen};
