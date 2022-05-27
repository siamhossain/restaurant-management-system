import React, {Component} from 'react';
import {WaterTankDebugger} from "@/App/Services/Providers/Core/WaterTank/Debugger";
import {StoreInformationProvider} from "@/App/Services/Providers/Modules/Admin";
import {StoreInformationSettingDialogScreen} from "@/Components/Screens/Private/Admin/StoreInformation";
import {toaster} from "evergreen-ui";

class StartupComponents extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            storeSetting: false,
            name: '',
            email: '',
            phone: '',
            address: '',
            slogan: '',

        };

        this.onFormStateChange = this.onFormStateChange.bind(this);
        this.onSaveInformation = this.onSaveInformation.bind(this);
    }

    private storeInfo = () => {
        StoreInformationProvider.getStoreInformation((data) => {
            if (data === null) {
                this.setState({
                    storeSetting: true,
                });
            }
        });
    }

    private onFormStateChange(key: any, value: any): void {
        this.setState({[key]: value});
    }

    private onSaveInformation(): void {
        const data = this.state;
        if (data.name === '') {
            toaster.danger("Name can not be null!");
            return;
        }

        if (data.phone === '') {
            toaster.danger('Phone can not be null!');
            return;
        }
        if (data.address === '') {
            toaster.danger('Address can not be null!');
            return;
        }
        const formData = {
            name: data.name,
            email: data.email,
            phone_1: data.phone,
            address_one: data.address,
            slogan: data.slogan,
        }
        StoreInformationProvider.saveStoreInformation(formData, (data) => {
            toaster.success(data.message);
            this.setState({storeSetting: false})
        })
    }

    public componentDidMount(): void {
        this.storeInfo();
    }


    public componentWillUnmount(): void {

    }

    render(): Required<React.ReactNode> {

        return (
            <React.Fragment>
                <WaterTankDebugger/>
                <StoreInformationSettingDialogScreen
                    onStateChange={this.onFormStateChange}
                    onViewClose={() => this.setState({storeSetting: false})}
                    open={this.state.storeSetting}
                    name={this.state.name}
                    email={this.state.email}
                    phone={this.state.phone}
                    address={this.state.address}
                    onSubmit={this.onSaveInformation}
                />
            </React.Fragment>
        );
    }
}

export {StartupComponents};
