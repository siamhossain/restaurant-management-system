import React, {Fragment, ReactElement} from 'react';
import {SignInStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/SignIn";
import SignInLogo from "@/Static/Images/StoreFront/PlutoKitchen/SignIn/signin-logo.png";
import {TextInputField} from "evergreen-ui";
import {RouterProvider} from "@/App/Services/Providers/Core/Router";
import {ROUTE_PATHS} from "@/Routes";
import {IAdminLoginViewState} from "@/Views/Public/AdminLogin/AdminLogin.View";

interface IAdminLoginScreenProps {
    email: IAdminLoginViewState['username'],
    password: IAdminLoginViewState['password'],

    onChangeEmail(email: IAdminLoginViewState['username']): void,

    onChangePassword(password: IAdminLoginViewState['password']): void,

    onSubmit(): void,
}

const AdminLoginScreen: React.FC<IAdminLoginScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <div className={SignInStyleSheet.classes.root}>
                <div className="sign-in">
                    <RouterProvider.Link to={ROUTE_PATHS.GLOBAL.ROOT}>
                        <div className="sign-in-logo">
                            <img src={SignInLogo} alt="{SignInLogo}"/>
                        </div>
                    </RouterProvider.Link>
                    <h2>Login</h2>
                    <p className={"signin-with-phone"}>Login with Username and Password</p>

                    <div className="sign-in-from">

                        <TextInputField
                            description="Username*"
                            className={"phone-number"}
                            placeholder="Username"
                            value={props.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChangeEmail(e.target.value)}
                            onKeyDown={(e: React.KeyboardEvent) => {
                                if (e.keyCode === 13) {
                                    props.onSubmit();
                                }
                            }}
                        />

                        <TextInputField
                            type={"password"}
                            description="Password*"
                            className={"phone-number"}
                            placeholder="Password"
                            value={props.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChangePassword(e.target.value)}
                            onKeyDown={(e: React.KeyboardEvent) => {
                                if (e.keyCode === 13) {
                                    props.onSubmit();
                                }
                            }}
                        />
                        <div className="button">
                            <button onClick={props.onSubmit}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export {AdminLoginScreen};
