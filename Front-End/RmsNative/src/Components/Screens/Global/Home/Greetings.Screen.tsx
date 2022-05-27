import React, {Fragment, ReactElement} from 'react';
import {Text, View, ScrollView} from "react-native";
import {GreetingsStyleSheet} from "@/Static/StyleSheets/Global/Home";


const GreetingsScreen = (): ReactElement => {
    return (
        <Fragment>
            <ScrollView style={GreetingsStyleSheet.root}>
                <View style={GreetingsStyleSheet.titleContainer}>
                    <Text style={GreetingsStyleSheet.titleText}>
                        {" Hey!"}
                    </Text>
                </View>

                <View style={GreetingsStyleSheet.subTitleContainer}>
                    <Text style={GreetingsStyleSheet.subtitleText}>
                        {"Let's get your order"}
                    </Text>
                </View>
            </ScrollView>
        </Fragment>
    );
};

export {GreetingsScreen};
