import React, {Fragment, ReactElement} from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {ProfileMenuStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Customer/ProfileMenu";
import {RouterProvider} from "@/App/Services/Providers/Core/Router";
import {ROUTE_PATHS} from "@/Routes";




const ProfileMenu = (): ReactElement => {

    return (
        <Fragment>
            <div className={ProfileMenuStyleSheet.classes.ProfileMenuList}>
                <RouterProvider.Link to={ROUTE_PATHS.PRIVATE.MY_PROFILE}>
                    <span><ChevronRightIcon/> My Profile </span>
                </RouterProvider.Link>
                <RouterProvider.Link to={ROUTE_PATHS.GLOBAL.ROOT}>
                    <span><ChevronRightIcon/> Dashboard </span>
                </RouterProvider.Link>
                <RouterProvider.Link to={ROUTE_PATHS.PRIVATE.ORDER_LIST}>
                    <span><ChevronRightIcon/> Orders </span>
                </RouterProvider.Link>
                <RouterProvider.Link to={ROUTE_PATHS.PRIVATE.ADDRESS}>
                    <span><ChevronRightIcon/> Adresses </span>
                </RouterProvider.Link>
                <RouterProvider.Link to={ROUTE_PATHS.PRIVATE.ACCOUNT_DETAILS}>
                    <span><ChevronRightIcon/> Account Details </span>
                </RouterProvider.Link>
                <RouterProvider.Link to={ROUTE_PATHS.PUBLIC.SIGN_IN}>
                    <span><ChevronRightIcon/> Logout </span>
                </RouterProvider.Link>
            </div>
        </Fragment>
    );
};

export {ProfileMenu};
