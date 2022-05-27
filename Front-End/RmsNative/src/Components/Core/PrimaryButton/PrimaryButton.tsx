import React, {Fragment, ReactElement} from 'react';
import {Button} from 'react-native-paper';
import {PrimaryButtonStyleSheet} from "@/Static/StyleSheets/Global/PrimaryButton";
import {TextStyle} from "react-native";

interface IPrimaryButtonProps {
    label: string,
    style?: React.CSSProperties,
    labelStyle?: TextStyle,
    onPress?(): void,
}

const PrimaryButton: React.FC<IPrimaryButtonProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Button
                mode="contained"
                onPress={props.onPress}
                style={{
                    ...PrimaryButtonStyleSheet.root,
                    ...props.style,
                }}
                uppercase={false}
                labelStyle={{
                    ...PrimaryButtonStyleSheet.label,
                    ...props.labelStyle,
                }}>
                {props.label}
            </Button>
        </Fragment>
    );
};

export {PrimaryButton};
