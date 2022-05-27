import React, {Fragment, ReactElement} from 'react';
import {SignInViewStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/SignIn";
import SignInImage from "@/Static/Images/StoreFront/PlutoKitchen/SignIn/signin-image.png";
import {AdminLoginScreen} from "@/Components/Screens/Public/AdminLogin";
import {AuthenticationProvider} from "@/App/Services/Providers/Modules/Admin";
import {convertToString} from "@/App/Functions/Custom";
import {toaster} from "evergreen-ui";
import {AuthProvider} from "@/App/Services/Providers/Core/Auth";
import {RouterProvider} from "@/App/Services/Providers/Core/Router";
import {ROUTE_PATHS} from "@/Routes";

export interface IAdminLoginViewProps {
    history?: any,
}

export interface IAdminLoginViewState {
    username: string,
    password: string,
}

class AdminLoginView extends React.Component<IAdminLoginViewProps, IAdminLoginViewState> {
    constructor(props: IAdminLoginViewProps) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };

        this.login = this.login.bind(this);
    }

    private login(): void {
        const {username, password} = this.state;

        if(convertToString(username) === "") {
            toaster.danger("Please enter username!");
            return;
        }

        if(convertToString(password) === "") {
            toaster.danger("Please enter password!");
            return;
        }

        AuthenticationProvider.attempt(username, password, ({data}) => {
            const token = data.token;
            new AuthProvider().set(token);
            this.props.history.push(ROUTE_PATHS.PRIVATE.ADMIN.ROOT);
        });
    }

    render(): ReactElement {
        return (
            <Fragment>
                <div className={SignInViewStyleSheet.classes.root}>
                    <table className={"sign-in-table"} cellSpacing={0} cellPadding={0}>
                        <td className={"sign-in-left-section"}>
                            <div className={"sign-in-content"}>
                                <AdminLoginScreen
                                    email={this.state.username}
                                    password={this.state.password}
                                    onChangeEmail={(email) => this.setState({username: email})}
                                    onChangePassword={(password) => this.setState({password})}
                                    onSubmit={this.login}
                                />
                            </div>
                        </td>

                        <td className={"sign-in-right-section"}>
                            <div className={"sign-in-img"} style={{
                                background: "url(" + SignInImage + ")",
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}>
                            </div>
                        </td>
                    </table>
                </div>
            </Fragment>
        );
    }
}

export default RouterProvider.withRouter(AdminLoginView);
