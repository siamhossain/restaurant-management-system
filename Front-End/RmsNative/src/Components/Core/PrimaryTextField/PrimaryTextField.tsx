import React, {Fragment, ReactElement} from 'react';
import {
    KeyboardTypeOptions,
    NativeSyntheticEvent, StyleProp,
    Text,
    TextInput,
    TextInputChangeEventData, TextStyle,
    View,
    ViewStyle
} from "react-native";
import {PrimaryTextFieldStyleSheet} from "@/Static/StyleSheets/Global/PrimaryTextField";

interface IPrimaryTextFieldProps {
    label?: string,
    placeholder?: string,
    value?: string | number,
    onChange?(e: NativeSyntheticEvent<TextInputChangeEventData>): void,
    onChangeValue?(value: string): void,
    containerStyle?: ViewStyle,
    inputStyle?: TextStyle,
    keyboardType?: KeyboardTypeOptions | undefined,
}

const PrimaryTextField: React.FC<IPrimaryTextFieldProps> = (props): ReactElement => {
    return (
        <Fragment>
            <View style={{
                ...PrimaryTextFieldStyleSheet.root,
                ...props.containerStyle,
            }}>
                {props.label && (
                    <Text style={PrimaryTextFieldStyleSheet.label}>
                        {props.label}
                    </Text>
                )}
                <TextInput
                    style={{
                        ...PrimaryTextFieldStyleSheet.textInput,
                        ...props.inputStyle,
                    }}
                    placeholder={props.placeholder}
                    value={props.value ? props.value.toString() : undefined}
                    onChange={props.onChange}
                    onChangeText={props.onChangeValue}
                    keyboardType={props.keyboardType}
                />
            </View>
        </Fragment>
    );
};

export {PrimaryTextField};
