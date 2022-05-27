import React, { Fragment, ReactElement } from 'react';
import {Text, View} from "react-native";
import {SectionTitleStyleSheet} from "@/Static/StyleSheets/Global/SectionTitle";

interface ISectionTitleScreenProps {
    commonText: string,
    title: string,
}

const SectionTitleScreen: React.FC<ISectionTitleScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <View style={SectionTitleStyleSheet.root}>
                <Text style={SectionTitleStyleSheet.titleCommon}>
                    {props.commonText}
                    <Text style={SectionTitleStyleSheet.title}>{props.title}</Text>
                </Text>
            </View>

        </Fragment>
    );
};

export { SectionTitleScreen };
