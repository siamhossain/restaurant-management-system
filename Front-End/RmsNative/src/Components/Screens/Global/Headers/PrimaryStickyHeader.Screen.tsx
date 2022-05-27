import React, {Fragment, ReactElement} from 'react';
import {PrimaryHeaderScreen, PrimaryHeaderScreenProps} from "@/Components/Screens/Global/Headers/PrimaryHeader.Screen";
import {ScrollView, View} from "react-native";

interface PrimaryStickyHeaderScreenProps {
    headerProps?: PrimaryHeaderScreenProps,
    children?: React.ReactNode,
    bodyBackgroundColor?: string,
}

const PrimaryStickyHeaderScreen: React.FC<PrimaryStickyHeaderScreenProps> = (props): ReactElement => {
    const [stickyEnabled, setStickyEnabled] = React.useState(false);
    const [scrollPosition, setScrollPosition] = React.useState(0);

    return (
        <Fragment>

            <ScrollView
                stickyHeaderIndices={stickyEnabled ? [0] : undefined}
                onScroll={(e) => {
                    const __scrollPosition = e.nativeEvent.contentOffset.y;

                    if (__scrollPosition < scrollPosition) {
                        setStickyEnabled(true);
                    } else {
                        setStickyEnabled(false);
                    }


                    setScrollPosition(__scrollPosition);
                }}
                style={{
                    flex: 1,
                    backgroundColor: !props.bodyBackgroundColor ? "#ffffff" : props.bodyBackgroundColor,
                }}>
                <PrimaryHeaderScreen
                    {...props.headerProps}
                />

                <View>
                    {props.children}
                </View>
            </ScrollView>
        </Fragment>
    );
};

export {PrimaryStickyHeaderScreen};
