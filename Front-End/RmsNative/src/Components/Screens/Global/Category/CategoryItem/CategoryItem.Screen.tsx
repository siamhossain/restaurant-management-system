import React, { Fragment, ReactElement } from 'react';
import {Text, View, Image, TouchableOpacity, ImageSourcePropType} from "react-native";
import {CategoryItemStyleSheet} from "@/Static/StyleSheets/Global/Category/CategoryItem";
import {ROUTES} from "@/Routes";
import {useNavigation} from "@react-navigation/core";


interface ICategoryItemScreenProps {
    onPress?(): void,
    imageSrc: ImageSourcePropType,
    title: string,
}

const CategoryItemScreen: React.FC<ICategoryItemScreenProps> = (props): ReactElement => {
    const navigation: any = useNavigation();
    return (
        <Fragment>
            <TouchableOpacity
              /*  onPress={props.onPress}*/
                onPress={() =>navigation.navigate(ROUTES.GLOBAL.CATEGORY_LIST)}
                activeOpacity={0.8}
                style={CategoryItemStyleSheet.root}>
                <View style={CategoryItemStyleSheet.categoryImageContainer}>
                    <Image
                        source={props.imageSrc}
                        style={CategoryItemStyleSheet.categoryItemImage}
                    />
                </View>
                <View style={CategoryItemStyleSheet.titleContainer}>
                     <Text style={CategoryItemStyleSheet.title}>
                         {props.title}
                     </Text>
                </View>
            </TouchableOpacity>
        </Fragment>
    );
};

export { CategoryItemScreen };
