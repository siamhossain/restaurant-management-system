import React, { Fragment, ReactElement } from 'react';
import {TextInput} from 'evergreen-ui';
import {Button} from "evergreen-ui";
import {EditProfileStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/EditProfile";
import Grid from "@material-ui/core/Grid";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import {ProfileMenu} from "@/Components/Screens/Private/StoreFront/Plutokitchen/Customer/ProfileMenu/ProfileMenu";

const EditProfileScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={EditProfileStyleSheet.classes.root}>
                <div className={CommonStyleSheet.classes.container}>
                    <div className="profile-Edit-section">
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                <div style={{border: "1px solid #e5e5e5", padding: "25px 10px 100px 30px"}}>
                                    <ProfileMenu/>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                                <div style={{border: "1px solid #e5e5e5", padding: "25px 10px 100px 30px"}}>
                                     <h2>Edit Profile</h2>
                                    <form>
                                        <Grid container spacing={3}>
                                            {/*<div style={{ }}>*/}
                                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                                <div className="profileInfo">
                                                    <h5>Full Name</h5>
                                                    <TextInput
                                                        placeholder="Full Name"
                                                        value={""}
                                                    />
                                                </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                                <div className="profileInfo">
                                                    <h5>Phone Number</h5>
                                                    <TextInput
                                                        placeholder="Phone Number"
                                                        value={""}
                                                    />
                                                </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                                <div className="profileInfo">
                                                    <h5>Email Address</h5>
                                                    <TextInput
                                                        placeholder="Email"
                                                        value={""}
                                                    />
                                                </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                                <div className="profileInfo">
                                                    <h5>Present Address</h5>
                                                    <TextInput
                                                        placeholder="Present Address"
                                                        value={""}
                                                    />
                                                </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                                <div className="profileInfo">
                                                    <h5>Area Code</h5>
                                                    <TextInput
                                                        placeholder="Area Code"
                                                        value={""}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </form>
                                    <div className="action_buttons">
                                        <Button marginRight={16}>Save Changes</Button>
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

export { EditProfileScreen };
