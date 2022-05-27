import React, { Fragment, ReactElement } from 'react';
import { TextInputField, Textarea, Label, Select, SelectField } from 'evergreen-ui'
import {BookTableStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/BookTable";
import Grid from "@material-ui/core/Grid";



const BookTableScreen = (): ReactElement => {
    return (
        <Fragment>

            <div className={BookTableStyleSheet.classes.root}>
                    <div className="bookTable-container">
                        <div className="row">

                        <div className="bookTable-title">
                            <h1> <span>Book A</span> Table</h1>
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className="bookTable-form">
                                    <TextInputField
                                        placeholder="Enter your name"
                                        label={"Full Name"}
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className="bookTable-form">
                                    <TextInputField
                                        placeholder="Enter your phone number"
                                        label={"Phone Number"}
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className="bookTable-form">
                                    <TextInputField
                                        placeholder="Enter your email Address"
                                        label={"Email Address"}
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className="bookTable-form">
                                    <TextInputField
                                        placeholder="Person in number"
                                        label={"Person"}
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className="bookTable-form">
                                    <TextInputField
                                        type={'date'}
                                        placeholder="mm/dd/yyyy"
                                        label={"Date"}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className="bookTable-form">
                                    <TextInputField type={'time'}
                                        placeholder="Time"
                                        label={"Time"}
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className="bookTable-form">
                                    <SelectField width="100%" label={"Ocation"}>
                                        <option value="birthday" selected>
                                            Birthday
                                        </option>
                                        <option value="bar">Anniversary</option>
                                        <option value="bar">Other ocation</option>
                                    </SelectField>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="bookTable-form" style={{marginTop: "10px"}}>
                                    <Label htmlFor="textarea-2" marginBottom={4} display="block" style={{marginBottom: "10px"}}>
                                        Message
                                    </Label>
                                    <Textarea id="textarea-2" placeholder="Message..." />
                                </div>
                            </Grid>



                        </Grid>
                        <div className="button">
                            <button>BOOK TABLE</button>
                        </div>
                    </div>
                </div>

            </div>

        </Fragment>
    );
};

export { BookTableScreen };
