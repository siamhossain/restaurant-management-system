import React, { Fragment, ReactElement } from 'react';
import {AccountDetailsStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/AccountDetails";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import Grid from "@material-ui/core/Grid";
import {ProfileMenu} from "@/Components/Screens/Private/StoreFront/Plutokitchen/Customer/ProfileMenu/ProfileMenu";
import {TextInputField} from "evergreen-ui";

const AccountDetailsScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={AccountDetailsStyleSheet.classes.root}>
                <div className={CommonStyleSheet.classes.container}>
                    <div className="account-details-section">
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                <ProfileMenu/>
                            </Grid>

                            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                                <div className="account-details-from">
                                    <TextInputField
                                        description="FIRST NAME *"
                                        className={"first-name"}
                                        placeholder=" "
                                    />
                                    <TextInputField
                                        description="LAST NAME *"
                                        className={"first-name"}
                                        placeholder=" "
                                    />
                                    <TextInputField
                                        description="DISPLAY Name*"
                                        className={"first-name"}
                                        placeholder=" "
                                        hint="This will be how your name will be displayed in the account section and in reviews."
                                    />
                                    <TextInputField
                                        description="EMAIL*"
                                        className={"first-name"}
                                        placeholder=" "
                                    />
                                </div>

                                <div className="password-change-section">
                                    <h1>Password change</h1>
                                    <div className="password-change-from">
                                        <TextInputField
                                            description="Current password"
                                            className={"password"}
                                            placeholder=" "
                                        />
                                        <TextInputField
                                            description="New password"
                                            className={"password"}
                                            placeholder=" "
                                        />
                                        <TextInputField
                                            description="Confirm New password"
                                            className={"password"}
                                            placeholder=" "
                                        />

                                        <div className="button">
                                            <button>SAVE CHANGE</button>
                                        </div>
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

export { AccountDetailsScreen };
