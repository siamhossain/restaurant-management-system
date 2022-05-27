import React, {Fragment, ReactElement} from 'react';
import {HeaderStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Header";
import Logo from "@/Static/Images/StoreFront/PlutoKitchen/Header/Logo.png";
import cartIcon from "@/Static/Icons/ic_cart.png";
import MenuIcon from '@material-ui/icons/Menu';
import {IconButton} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {RouterProvider} from '@/App/Services/Providers/Core/Router';
import MobileDrawerScreen from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header/MobileDrawer.Screen";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import {ROUTE_PATHS} from "@/Routes";

const HeaderScreen = (): ReactElement => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Fragment>
            <div className={HeaderStyleSheet.classes.root}>
                <div className={CommonStyleSheet.classes.container}>
                    <div className={HeaderStyleSheet.classes.header}>
                        <table cellPadding={0} cellSpacing={0} className={"header-table"}>
                            <tbody>
                            <tr>
                                <td className={"logo"}>
                                    <IconButton className={"mobile-menu-icon"} size={"small"} onClick={toggleDrawer}>
                                        <MenuIcon/>
                                    </IconButton>
                                    <RouterProvider.Link to={ROUTE_PATHS.GLOBAL.ROOT}>
                                        <img src={Logo} alt="Logo"/>
                                    </RouterProvider.Link>
                                </td>

                                <td className={"nav"}>
                                    <div className={"nav-container"}>
                                        <RouterProvider.Link className={"nav-item"} to={ROUTE_PATHS.GLOBAL.ROOT}>Home</RouterProvider.Link>
                                        <RouterProvider.Link className={"nav-item"} to={ROUTE_PATHS.GLOBAL.ABOUT_US}>About</RouterProvider.Link>
                                        <RouterProvider.Link className={"nav-item"} to={ROUTE_PATHS.GLOBAL.SHOP}>Shop</RouterProvider.Link>
                                        <RouterProvider.Link className={"nav-item"} to={ROUTE_PATHS.GLOBAL.BLOG_DETAILS}>Blog</RouterProvider.Link>
                                        <RouterProvider.Link className={"nav-item"} to={ROUTE_PATHS.GLOBAL.CONTACT}>Contact</RouterProvider.Link>
                                        <RouterProvider.Link className={"nav-item"} to={ROUTE_PATHS.PUBLIC.SIGN_IN}>Sign In</RouterProvider.Link>
                                    </div>

                                    <div className={"mobile-menu-icons"}>
                                        <IconButton size={"small"} className={"menu"}>
                                            <AccountCircleIcon/>
                                        </IconButton>
                                    </div>

                                    <RouterProvider.Link className={"nav-item"} to={ROUTE_PATHS.GLOBAL.CART}>
                                        <div className={"cart-button"}>
                                            <img alt={"cart"} src={cartIcon}/>
                                            <span className={"badge"}>0</span>
                                        </div>
                                    </RouterProvider.Link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <MobileDrawerScreen open={drawerOpen} onToggle={toggleDrawer}/>
        </Fragment>
    );
};

export {HeaderScreen};
