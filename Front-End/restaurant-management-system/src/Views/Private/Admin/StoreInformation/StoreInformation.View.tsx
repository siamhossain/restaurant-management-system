import {IStoreInformation} from '@/App/Interfaces/Models';
import React, {Fragment, ReactElement} from 'react';
import View from "@/Components/Base/View";
import {StoreInformationProvider, UploaderProvider} from "@/App/Services/Providers/Modules/Admin";
import {convertToString} from "@/App/Functions/Custom";
import {Button, FilePicker, TextInputField, toaster} from "evergreen-ui";
import {Grid} from "@material-ui/core";
import {css} from "@emotion/css";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";

export interface IStoreInformationViewProps {

}

export interface IStoreInformationViewState {
    grid: {
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        district_list: any[],
        division_list: any[],
        upazila_list: any[],

        filter: {
            search: string,
        },
    },
    form: {
        is_uploading: boolean,
        uuid: IStoreInformation['uuid'],
        name: IStoreInformation['name'],
        slogan: IStoreInformation['slogan'],
        about: IStoreInformation['about'],
        logo_uri: IStoreInformation['logo_uri'],
        banner_uri: IStoreInformation['banner_uri'],
        website: IStoreInformation['website'],
        email: IStoreInformation['email'],
        phone_1: IStoreInformation['phone_1'],
        phone_2: IStoreInformation['phone_2'],
        address_one: IStoreInformation['address_one'],
        address_two: IStoreInformation['address_two'],
        address_three: IStoreInformation['address_three'],
        division_id: IStoreInformation['division_id'],
        district_id: IStoreInformation['district_id'],
        upazila_id: IStoreInformation['upazila_id'],
        zip_code: IStoreInformation['zip_code'],
        post_office: IStoreInformation['post_office'],

    },

    view: {
        data: Partial<IStoreInformation>,
        open: boolean,
    }

}

class StoreInformationView extends View<IStoreInformationViewProps, IStoreInformationViewState> {
    constructor(props: IStoreInformationViewProps) {
        super(props);
        this.initialState = {
            grid: {
                rows_per_page: 10,
                current_page: 0,
                total_pages: 0,
                prev_page: 0,
                next_page: 0,
                first_page: 0,
                last_page: 0,

                district_list: [],
                division_list: [],
                upazila_list: [],
                filter: {
                    search: "",
                },
            },
            form: {
                is_uploading: false,
                uuid: "",
                about: "",
                address_one: "",
                address_two: "",
                address_three: "",
                banner_uri: "",
                district_id: 0,
                division_id: 0,
                upazila_id: 0,
                email: "",
                logo_uri: "",
                name: "",
                phone_1: "",
                phone_2: "",
                post_office: "",
                slogan: "",
                website: "",
                zip_code: "",
            },
            view: {
                data: {},
                open: false,
            },

            additional: {}
        }
        this.state = this.initialState;

        this.saveStoreInformation = this.saveStoreInformation.bind(this);
        this.getDivisions = this.getDivisions.bind(this);
        this.getDistricts = this.getDistricts.bind(this);
        this.getUpazilas = this.getUpazilas.bind(this);
    }

    private getAccountingSettings(): void {
        StoreInformationProvider.getStoreInformation((data) => {
            if (data != null) {
                this.setFormState({
                    uuid: data.uuid,
                    name: data.name,
                    slogan: data.slogan,
                    about: data.about,
                    logo_uri: data.logo_uri,
                    banner_uri: data.banner_uri,
                    website: data.website,
                    email: data.email,
                    phone_1: data.phone_1,
                    phone_2: data.phone_2,
                    address_one: data.address_one,
                    address_two: data.address_two,
                    address_three: data.address_three,
                    division_id: data.division_id,
                    district_id: data.district_id,
                    upazila_id: data.upazila_id,
                    zip_code: data.zip_code,
                    post_office: data.post_office,
                });
            }

        })
    }

    private saveStoreInformation(): void {

        if (this.state.form.name === '') {
            toaster.danger("Name can not be empty!");
            return;
        }


        StoreInformationProvider.saveStoreInformation(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getAccountingSettings();

        });

    }

    private getDivisions(): void {
        StoreInformationProvider.getDivisions((data) => {
            this.setGridState({
                division_list: data,
            })
        });
    }

    private getDistricts(division_id: number): void {
        StoreInformationProvider.getDistricts(division_id, (data) => {
            this.setGridState({
                district_list: data,
            })
        });
    }

    private getUpazilas(district_id: number): void {
        StoreInformationProvider.getUpazilas(district_id, (data) => {
            this.setGridState({
                upazila_list: data,
            })
        });
    }


    componentDidMount(): void {
        this.getAccountingSettings();
        this.getDivisions();
    }

    render(): ReactElement {
        const data = this.state.form;
        return (
            <Fragment>

                <MainLayout>
                    <SideBarScreen/>
                    <div className="wrapper" style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                        <HeaderScreen/>
                        <div className={MainContainerStyleSheet.classes.root}>
                            <div className={"main-container"} style={{paddingTop: '10px'}}>
                                <ModuleTitleScreen
                                    moduleTitle={"Restaurant Information Setup"}

                                />

                                <div style={{padding: '0 30px'}}>
                                    <Grid container spacing={2}>
                                        <Grid item lg={3}>
                                            <TextInputField
                                                label={"Name"}
                                                name="text-input-name"
                                                value={convertToString(data.name)}
                                                onChange={(e: any) => this.setFormState({name: convertToString(e.target.value)})}
                                                placeholder="Your store name..."
                                            />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <TextInputField
                                                label={"Slogan"}
                                                name="text-input-name"
                                                placeholder="Your store slogan..."
                                                value={convertToString(data.slogan)}
                                                onChange={(e: any) => this.setFormState({slogan: convertToString(e.target.value)})}
                                            />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <TextInputField
                                                label={"Email"}
                                                name="text-input-name"
                                                placeholder="Your store email..."
                                                value={convertToString(data.email)}
                                                onChange={(e: any) => this.setFormState({email: convertToString(e.target.value)})}
                                            />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <TextInputField
                                                label={"Phone One"}
                                                name="text-input-name"
                                                placeholder="Store phone number one..."
                                                value={convertToString(data.phone_1)}
                                                onChange={(e: any) => this.setFormState({phone_1: convertToString(e.target.value)})}
                                            />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <TextInputField
                                                label={"Phone Two"}
                                                name="text-input-name"
                                                placeholder="Store phone number two..."
                                                value={convertToString(data.phone_2)}
                                                onChange={(e: any) => this.setFormState({phone_2: convertToString(e.target.value)})}
                                            />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <TextInputField
                                                label={" Website"}
                                                name="text-input-name"
                                                placeholder="Store website..."
                                                value={convertToString(data.website)}
                                                onChange={(e: any) => this.setFormState({website: convertToString(e.target.value)})}
                                            />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <div style={{
                                                color: "#101840",
                                                fontSize: 14,
                                                fontWeight: 500,
                                                marginBottom: 5
                                            }}>Select Logo
                                            </div>
                                            <div className={css`input {width: 100% !important;}`}>
                                                <FilePicker
                                                    onChange={files => {
                                                        this.setFormState({is_uploading: true, logo_uri: ''});
                                                        UploaderProvider.upload("store", files[0], (data: any) => {
                                                            this.setFormState({
                                                                logo_uri: data.data.path,
                                                                is_uploading: false,
                                                            });
                                                        });
                                                    }}
                                                    placeholder=""
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item lg={3}>
                                            <div style={{
                                                color: "#101840",
                                                fontSize: 14,
                                                fontWeight: 500,
                                                marginBottom: 5
                                            }}>Select Banner
                                            </div>
                                            <div className={css`input {width: 100% !important;}`}>
                                                <FilePicker
                                                    onChange={files => {
                                                        this.setFormState({is_uploading: true, logo_uri: ''});
                                                        UploaderProvider.upload("brand", files[0], (data: any) => {
                                                            this.setFormState({
                                                                logo_uri: data.data.path,
                                                                is_uploading: false,
                                                            });
                                                        });
                                                    }}
                                                    placeholder=""
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item lg={3}>
                                            <TextInputField
                                                label={"Address One"}
                                                name="text-input-name"
                                                placeholder="Store address..."
                                                value={convertToString(data.address_one)}
                                                onChange={(e: any) => this.setFormState({address_one: convertToString(e.target.value)})}
                                            />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <TextInputField
                                                label={"Address Two"}
                                                name="text-input-name"
                                                placeholder="Store address..."
                                                value={convertToString(data.address_two)}
                                                onChange={(e: any) => this.setFormState({address_two: convertToString(e.target.value)})}
                                            />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <TextInputField
                                                label={"Address Three"}
                                                name="text-input-name"
                                                placeholder="Store address..."
                                                value={convertToString(data.address_three)}
                                                onChange={(e: any) => this.setFormState({address_three: convertToString(e.target.value)})}
                                            />
                                        </Grid>
                                        {/* <Grid item lg={3}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Select Division</div>
                        <Select
                            value={this.state.form.division_id}
                            onChange={(event: any) => {
                                this.setFormState({division_id: event.target.value});
                                this.getDistricts(event.target.value);
                            }}
                            width={"100%"}>
                            <option value="">Select Division</option>
                            {this.state.grid.division_list.map((item: any, index) => (
                                <option key={index} value={item.id}>{item.bn_name}</option>
                            ))}

                        </Select>
                    </Grid>
                    <Grid item lg={3}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Select District</div>
                        <Select
                            value={this.state.form.district_id}
                            onChange={(event: any) => {
                                this.setFormState({district_id: event.target.value});
                                this.getUpazilas(event.target.value);
                            }}
                            width={"100%"}>
                            <option value="">Select District</option>
                            {this.state.grid.district_list.map((item: any, index) => (
                                <option key={index} value={item.id}>{item.bn_name}</option>
                            ))}

                        </Select>
                    </Grid>
                    <Grid item lg={3}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Select Upazila</div>
                        <Select
                            value={this.state.form.upazila_id}
                            onChange={(event: any) => {
                                this.setFormState({upazila_id: event.target.value});
                                // this.getUpazilas(event.target.value);
                            }}
                            width={"100%"}>
                            <option value="">Select Upazila</option>
                            {this.state.grid.upazila_list.map((item: any, index) => (
                                <option key={index} value={item.id}>{item.bn_name}</option>
                            ))}

                        </Select>
                    </Grid>*/}

                                        <Grid item lg={3}>
                                            <TextInputField
                                                label={"About"}
                                                name="text-input-name"
                                                placeholder="Store about..."
                                                value={convertToString(data.about)}
                                                onChange={(e: any) => this.setFormState({about: convertToString(e.target.value)})}
                                            />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <TextInputField
                                                label={"Post Office"}
                                                name="text-input-name"
                                                placeholder="Post office..."
                                                value={convertToString(data.post_office)}
                                                onChange={(e: any) => this.setFormState({post_office: convertToString(e.target.value)})}
                                            />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <TextInputField
                                                label={"Post Code"}
                                                name="text-input-name"
                                                placeholder="Post code..."
                                                value={convertToString(data.zip_code)}
                                                onChange={(e: any) => this.setFormState({zip_code: convertToString(e.target.value)})}
                                            />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <Button
                                                marginLeft={26}
                                                marginTop={25}
                                                appearance="primary"
                                                intent="success"
                                                onClick={this.saveStoreInformation}
                                            >
                                                Update
                                            </Button>
                                        </Grid>

                                    </Grid>
                                </div>
                            </div>
                        </div>

                    </div>
                </MainLayout>
            </Fragment>
        );
    }
}

export default StoreInformationView;
