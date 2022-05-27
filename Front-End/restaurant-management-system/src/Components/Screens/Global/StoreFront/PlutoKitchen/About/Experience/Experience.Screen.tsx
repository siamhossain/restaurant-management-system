import React, { Fragment, ReactElement } from 'react';
import {Grid} from "@material-ui/core";
import ExperienceImage from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/img_experience.png";
import {ExperienceInfoScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/About/Experience/ExperienceInfo.Screen";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";

const ExperienceScreen = (): ReactElement => {
    return (
        <Fragment>
            <div style={{padding: "70px 0"}}>
                <div className={CommonStyleSheet.classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <ExperienceInfoScreen/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div>
                                <img src={ExperienceImage} alt="Experience" style={{width: "100%"}}/>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Fragment>
    );
};

export { ExperienceScreen };
