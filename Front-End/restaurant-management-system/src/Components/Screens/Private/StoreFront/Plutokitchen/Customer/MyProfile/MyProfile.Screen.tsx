import React, { Fragment, ReactElement } from 'react';
import {MyProfileStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/MyProfile";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import Grid from "@material-ui/core/Grid";
import {ProfileMenu} from "@/Components/Screens/Private/StoreFront/Plutokitchen/Customer/ProfileMenu/ProfileMenu";
import {Avatar} from "@material-ui/core";
import Test from "@/Static/Images/StoreFront/PlutoKitchen/MyProfile/Guy.jpg";
import {ROUTE_PATHS} from "@/Routes";
import {useHistory} from "react-router-dom";

const MyProfileScreen = (): ReactElement => {
    const history = useHistory();


    return (
        <Fragment>
            <div className={MyProfileStyleSheet.classes.root}>
                <div className={CommonStyleSheet.classes.container}>
                    <div className="my-profile-section">
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                <div style={{border: "1px solid #e5e5e5", padding: "25px 10px 100px 30px"}}>
                                    <ProfileMenu/>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                                <div style={{border: "1px solid #e5e5e5", padding: "25px 10px 100px 30px"}}>
                                    <div className="profileImg">
                                        <div>
                                            <div className={"avatar"} style={{display: "inline-block"}}>
                                                <Avatar
                                                    src={Test}
                                                    alt={""}
                                                    style={{fontSize: 40}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12} md={6} lg={4}>
                                            <div className="profileInfo">
                                                <h5>Full Name</h5>
                                                <p>Siam Hossain</p>
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} lg={4}>
                                            <div className="profileInfo">
                                                <h5>Contact Number</h5>
                                                <p>1246545541</p>
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} lg={4}>
                                            <div className="profileInfo">
                                                <h5>Email Address</h5>
                                                <p>siam@gmail.com</p>
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} lg={4}>
                                            <div className="profileInfo">
                                                <h5>Gender</h5>
                                                <p style={{textTransform: "capitalize"}}>Male</p>
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} lg={4}>
                                            <div className="profileInfo">
                                                <h5>Member Since</h5>
                                                <p>21/11/29</p>
                                            </div>
                                        </Grid>
                                        <div className="profileActionBtn">
                                            <button onClick={() => history.push(ROUTE_PATHS.PRIVATE.EDIT_PROFILE)}>Edit Profile</button>
                                            <button>Change Password</button>
                                        </div>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { MyProfileScreen };
