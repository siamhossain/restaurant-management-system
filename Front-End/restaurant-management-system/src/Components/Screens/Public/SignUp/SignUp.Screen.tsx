import React, { Fragment, ReactElement } from 'react';
import {SignInStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/SignIn";
import SignInLogo from "@/Static/Images/StoreFront/PlutoKitchen/SignIn/signin-logo.png";
import {TextInputField} from "evergreen-ui";
import {RouterProvider} from "@/App/Services/Providers/Core/Router";
import {ROUTE_PATHS} from "@/Routes";

const SignUpScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={SignInStyleSheet.classes.root}>
                <div className="sign-in">
                    <RouterProvider.Link to={ROUTE_PATHS.GLOBAL.ROOT}>
                        <div className="sign-in-logo">
                            <img src={SignInLogo} alt="{SignInLogo}"/>
                        </div>
                    </RouterProvider.Link>
                    <h2>Sign Up</h2>
                    <p className={"signin-with-phone"}>Sign Up with Phone Number and Password</p>

                    <div className="sign-in-from">
                        <TextInputField
                            description="First Name*"
                            className={"phone-number"}
                            placeholder="First Name"
                        />
                        <TextInputField
                            description="Last Name*"
                            className={"phone-number"}
                            placeholder="Last Name"
                        />
                        <TextInputField
                            description="Email / Phone*"
                            className={"phone-number"}
                            placeholder="Email or Phone"
                        />

                        <TextInputField
                            description="Password*"
                            className={"phone-number"}
                            placeholder="Password"
                        />
                        <div className="button">
                            <button>Sign Up</button>
                        </div>

                        <p className="sign-in-bottom">Already have an account?<span><RouterProvider.Link to={ROUTE_PATHS.PUBLIC.SIGN_IN}> Sign In</RouterProvider.Link></span> </p>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { SignUpScreen };
