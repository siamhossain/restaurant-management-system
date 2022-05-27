import React, { Fragment, ReactElement } from 'react';
import {SignInStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/SignIn";
import SignInLogo from "@/Static/Images/StoreFront/PlutoKitchen/SignIn/signin-logo.png";
import {TextInputField} from "evergreen-ui";
import {RouterProvider} from '@/App/Services/Providers/Core/Router';
import {ROUTE_PATHS} from "@/Routes";

const ForgotPasswordScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={SignInStyleSheet.classes.root}>
                <div className="sign-in">
                    <RouterProvider.Link to={ROUTE_PATHS.GLOBAL.ROOT}>
                        <div className="sign-in-logo">
                            <img src={SignInLogo} alt="{SignInLogo}"/>
                        </div>
                    </RouterProvider.Link>

                    <div className="sign-in-from">
                        <h1 style={{padding: "35px 0"}}>Reset Password</h1>
                        <TextInputField
                            description="Password*"
                            className={"phone-number"}
                            placeholder="Password"
                        />
                        <TextInputField
                            description="Confirm Password*"
                            className={"phone-number"}
                            placeholder="Confirm Password"
                        />
                        <div className="button">
                            <button>Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export { ForgotPasswordScreen };
