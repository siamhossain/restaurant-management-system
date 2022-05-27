import React, { Fragment, ReactElement } from 'react';
import {SignInViewStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/SignIn";
import SignInImage from "@/Static/Images/StoreFront/PlutoKitchen/SignIn/signin-image.png";
import {SignUpScreen} from "@/Components/Screens/Public/SignUp";

const SignUpView = (): ReactElement => {
    return (
        <Fragment>
            <div className={SignInViewStyleSheet.classes.root}>
                <table className={"sign-in-table"}>
                        <td className={"sign-in-left-section"}>
                            <div className={"sign-in-content"}>
                                <SignUpScreen/>
                            </div>
                        </td>

                        <td className={"sign-in-right-section"}>
                            <div className={"sign-in-img"} style={{background: "url(" + SignInImage + ")", backgroundSize: "cover", backgroundPosition: "center" }}>
                            </div>
                        </td>
                </table>
            </div>
        </Fragment>
    );
};

export default SignUpView;
