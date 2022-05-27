import React, {Component} from 'react';
import SplashView from "@/Views/Global/Splash";

interface IServiceStates {
    serviceReady: boolean,
}

class StartupServices extends Component<any, IServiceStates> {
    constructor(props: any) {
        super(props);

        this.state = {
            serviceReady: false,
        };
    }

    public componentDidMount(): void {
        setTimeout(() => {
            this.setState({serviceReady: true})
        }, 2000);
    }

    public componentWillUnmount(): void {
    }

    render() {

        if (!this.state.serviceReady) {
            return <SplashView />;
        }

        if (this.state.serviceReady) {
            return (
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            );
        }

        return <React.Fragment/>;
    }
}

export {StartupServices};
