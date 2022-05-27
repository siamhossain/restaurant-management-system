import React, {Fragment, ReactElement} from 'react';
import {ScrollView, View} from "react-native";
import {Padding} from "@/App/Functions/Custom";

interface IPageScreenProps {

}

const PageScreen: React.FC<IPageScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <ScrollView style={{
                backgroundColor: "#ffffff",
                flex: 1,
            }}>
                <View style={{
                    ...Padding({
                        top: 5,
                        left: 22,
                        right: 22,
                        bottom: 5,
                    }),
                    backgroundColor: "#ffffff",
                    flex: 1,
                }}>
                    {props.children}
                </View>
            </ScrollView>
        </Fragment>
    );
};

export {PageScreen};
