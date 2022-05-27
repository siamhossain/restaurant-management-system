import React, { Fragment, ReactElement } from 'react';
import {SignInViewStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/SignIn";
import SignInImage from "@/Static/Images/StoreFront/PlutoKitchen/SignIn/signin-image.png";
import {ForgotPasswordScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/ForgotPassword";

const ForgotPasswordView = (): ReactElement => {
    return (
        <Fragment>
            <div className={SignInViewStyleSheet.classes.root}>
                <table className={"sign-in-table"} cellSpacing={0} cellPadding={0}>
                        <td className={"sign-in-left-section"}>
                            <div className={"sign-in-content"}>
                                <ForgotPasswordScreen/>
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

export default ForgotPasswordView;
