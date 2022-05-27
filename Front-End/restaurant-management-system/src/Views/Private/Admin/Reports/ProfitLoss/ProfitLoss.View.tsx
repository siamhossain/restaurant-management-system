import React, {Fragment, ReactElement} from 'react';
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {parseDate} from "@/App/Functions/Custom";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {Grid} from "@material-ui/core";
import Datetime from "react-datetime";
import {css} from "@emotion/css";
import {Button} from "evergreen-ui";
import {ApiConfig} from "@/App/Config/Api";
import View from "@/Components/Base/View";

class ProfitLossView extends View<any, any> {

    constructor(props: any) {
        super(props);

        this.initialState = {

            form: {
                from_date: parseDate(new Date()),
                to_date: parseDate(new Date()),
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
                                moduleTitle={"Profit Loss"}
                            />
                            <Grid container spacing={2} style={{marginLeft: "25px"}}>
                                <Grid item lg={3}>
                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>From Date</div>
                                    <Datetime
                                        value={parseDate(this.state.form.from_date)}
                                        onChange={(date: any) => this.setFormState({from_date: parseDate(date)})}
                                        timeFormat={false}
                                        className={css`position: absolute; border: 1px solid #ddd; padding: 3px 10px; * {outline: 0}`}

                                    />
                                </Grid>
                                <Grid item lg={3}>
                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>To Date</div>
                                    <Datetime
                                        value={parseDate(this.state.form.to_date)}
                                        onChange={(date: any) => this.setFormState({to_date: parseDate(date)})}
                                        timeFormat={false}
                                        className={css`position: absolute; border: 1px solid #ddd; padding: 3px 10px; * {outline: 0}`}

                                    />
                                </Grid>

                                <Grid item lg={3}>
                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginTop: 5}}>
                                        <Button onClick={() => window.open(ApiConfig.REPORTS_ROOT + "/profit-loss?from_date=" + this.state.form.from_date + "&to_date=" + this.state.form.to_date )} marginLeft={16} marginTop={20} appearance="primary" intent="success">
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

export default ProfitLossView;
