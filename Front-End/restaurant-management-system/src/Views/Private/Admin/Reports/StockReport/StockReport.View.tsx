import React, {Fragment, ReactElement} from 'react';
import {parseDate} from "@/App/Functions/Custom";
import {UserProvider} from "@/App/Services/Providers/Modules/Admin";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {Grid} from "@material-ui/core";
import {Button} from "evergreen-ui";
import {ApiConfig} from "@/App/Config/Api";
import View from "@/Components/Base/View";
import {CategoryDropdownScreen} from "@/Components/Screens/Private/Admin/Category";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {BrandDropdownScreen} from "@/Components/Screens/Private/Admin/Brand/BrandDropdown.Screen";

class StockReportView extends View<any, any> {

    constructor(props: any) {
        super(props);

        this.initialState = {

            form: {
                category_uuid: '',
                brand_uuid: '',
            }
        }

        this.state = this.initialState;

    }

    render(): ReactElement {
        return (
            <Fragment>
                <MainLayout>
                    <SideBarScreen/>
                    <div className="wrapper" style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                        <HeaderScreen/>
                        <div className={"main-container"} style={{paddingTop: '10px'}}>
                            <ModuleTitleScreen
                                moduleTitle={"Stock Report"}
                            />
                            <Grid container spacing={2} style={{marginLeft: "25px"}}>

                                <Grid item lg={3}>
                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Select Category</div>
                                    <CategoryDropdownScreen
                                        uuid={this.state.form.category_uuid}
                                        onChange={(uuid) => this.setFormState({category_uuid: uuid})}
                                        width={'100%'}
                                    />
                                </Grid>
                                <Grid item lg={3}>
                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Select Brand</div>
                                    <BrandDropdownScreen
                                        uuid={this.state.form.brand_uuid}
                                        onChange={(uuid) => this.setFormState({brand_uuid: uuid})}
                                        width={'100%'}
                                    />
                                </Grid>
                                <Grid item lg={3}>
                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginTop: 5}}>
                                        <Button onClick={() => window.open(ApiConfig.REPORTS_ROOT + "/stock-report?category_uuid=" + this.state.form.category_uuid + "&brand_uuid=" + this.state.form.brand_uuid)} marginLeft={16} marginTop={20} appearance="primary" intent="success">
                                            Submit
                                        </Button>
                                    </div>

                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </MainLayout>

            </Fragment>
        );
    }
}

export default StockReportView;
