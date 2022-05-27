import React, { Fragment, ReactElement } from 'react';
import Grid from "@material-ui/core/Grid";
import QualityFoodImage from "@/Static/Images/StoreFront/PlutoKitchen/Awesome Service/img_quality.png";
import ChefImage from "@/Static/Images/StoreFront/PlutoKitchen/Awesome Service/img_chef.png";
import QualityImage from "@/Static/Images/StoreFront/PlutoKitchen/Awesome Service/img_fast_delivery.png";
import {SingleServiceScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Services/SingleService/SingleService.Screen";
import {ServicesStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Services/Services.StyleSheet";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";





const ServicesScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={ServicesStyleSheet.classes.root}>
                <div className={CommonStyleSheet.classes.container}>
                    <h1 className={"section-heading"}><span>Our Awesome</span> Service</h1>
                    <div className={"services-grid-wrapper"}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <SingleServiceScreen
                                    src={QualityFoodImage}
                                    service_heading={"Quality Food"}
                                    service_info_detail={"The Perfect Place to enjoy fine food with excellent service in comfortable surrounding"}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <SingleServiceScreen
                                    src={ChefImage}
                                    service_heading={"Quality Food"}
                                    service_info_detail={"The Perfect Place to enjoy fine food with excellent service in comfortable surrounding"}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <SingleServiceScreen
                                    src={QualityImage}
                                    service_heading={"Quality Food"}
                                    service_info_detail={"The Perfect Place to enjoy fine food with excellent service in comfortable surrounding"}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { ServicesScreen };
