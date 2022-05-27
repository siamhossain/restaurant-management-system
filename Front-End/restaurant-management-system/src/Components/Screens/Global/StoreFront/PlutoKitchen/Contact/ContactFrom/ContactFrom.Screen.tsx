import React, { Fragment, ReactElement } from 'react';
import {ContactFromStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/contactFrom";
import Grid from "@material-ui/core/Grid";
import {TextInputField, Textarea} from "evergreen-ui";

const ContactFromScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={ContactFromStyleSheet.classes.root}>
                <div className="from-section">
                    <div className="from-container">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <TextInputField
                                        placeholder="Your Name"
                                        className="your-name"
                                    />
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <TextInputField
                                        placeholder="Your Mail Address"
                                        className="your-name"
                                    />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <TextInputField
                                        placeholder="Enter Your Subject"
                                        className="your-name"
                                    />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Textarea
                                    name="textarea-1"
                                    placeholder="Textarea placeholder..."
                                    className={"your-message"}
                                />

                            </Grid>
                        </Grid>
                        <div className="button">
                            <button>Send Message</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { ContactFromScreen };
