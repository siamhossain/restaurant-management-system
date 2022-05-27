import React, { Fragment, ReactElement } from 'react';
import {SignInStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/SignIn";
import SignInLogo from "@/Static/Images/StoreFront/PlutoKitchen/SignIn/signin-logo.png";
import {TextInputField} from "evergreen-ui";
import {RouterProvider} from '@/App/Services/Providers/Core/Router';
import {ROUTE_PATHS} from "@/Routes";

const SignInScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={SignInStyleSheet.classes.root}>
                <div className="sign-in">
                    <RouterProvider.Link to={ROUTE_PATHS.GLOBAL.ROOT}>
                        <div className="sign-in-logo">
                            <img src={SignInLogo} alt="{SignInLogo}"/>
                        </div>
                    </RouterProvider.Link>
                    <h2>Welcome Back</h2>
                    <p className={"signin-with-phone"}>Sign in with Phone Number and Password</p>

                    <div className="sign-in-from">
                        <h1>Login</h1>
                        <TextInputField
                            description="Email / Phone*"
                            className={"phone-number"}
                            placeholder="Email or Phone"
                        />
                        <TextInputField
                            type={"password"}
                            description="Password*"
                            className={"phone-number"}
                            placeholder="***********"
                        />
                        <div className="button">
                            <button>Login</button>
                        </div>

                        <p className="sign-in-bottom">Don’t have an account?<span> <RouterProvider.Link to={ROUTE_PATHS.PUBLIC.SIGN_UP}>Sign up</RouterProvider.Link></span> </p>
                        <p><span>Forgot Password</span></p>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export { SignInScreen };
