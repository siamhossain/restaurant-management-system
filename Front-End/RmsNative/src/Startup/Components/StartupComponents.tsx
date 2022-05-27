import React, {Component, Fragment} from 'react';
import {StatusBar} from "react-native";
import {ColorsConfig} from "@/App/Config/Theme/Colors";

class StartupComponents extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            authServiceReady: false,
        };
    }

    public componentDidMount(): void {

    }

    public componentWillUnmount(): void {

    }

    render(): Required<React.ReactNode> {

        return (
            <Fragment>
                <StatusBar
                    backgroundColor={ColorsConfig.statusBarColor}
                    animated={true}
                    barStyle="light-content"
                />
            </Fragment>
        );
    }
}

export {StartupComponents};
