import React, { Fragment, ReactElement } from 'react';
import {ContactStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Contact";
import LocationImage from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/Get in touch/place-icon.png";
import CityImage from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/Get in touch/City.png";
import Grid from '@material-ui/core/Grid';

const ContactScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={ContactStyleSheet.classes.root}>
                <div className="contact-container">
                    <div className="wrapper">
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <div className="contact-img">
                                    <img src={LocationImage} alt=""/>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                                <div className="contact-info-bg">
                                    <div className="contact-info">
                                        <p>Contact</p>
                                        <h1 className="moto">Get in Touch</h1>
                                        <span className="address">House: 735, Road: 11, Avenue: 4, Mirpur DOHS</span>
                                        <button className="direction-btn">Get Direction</button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { ContactScreen };
