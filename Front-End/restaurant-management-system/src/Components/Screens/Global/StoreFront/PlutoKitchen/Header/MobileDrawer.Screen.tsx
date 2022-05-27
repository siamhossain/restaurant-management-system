import React from 'react';
import {MobileDrawerStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Header";
import {RouterProvider} from "@/App/Services/Providers/Core/Router";
import {ROUTE_PATHS} from "@/Routes";
import Avatar from '@material-ui/core/Avatar';
import { CrossIcon } from 'evergreen-ui'

interface IMobileDrawerScreenProps {
    open?: boolean,
    onToggle?(): void,
}

const MobileDrawerScreen: React.FC<IMobileDrawerScreenProps> = (props) => {
    return (
        <div className={MobileDrawerStyleSheet.classes.root(props.open)}>
            <div className={"overlay"} onClick={props.onToggle}/>

            <div className={"drawer"}>
                <div className="profile-section">
                    <button onClick={props.onToggle}><CrossIcon /></button>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={"avatar"}/>
                    <h3 className={"profile-name"}> Siam Hossain</h3>
                </div>

                <div className={"mobile-nav-container"}>
                    <ul className={"mobile-nav-list"}>
                        <li><RouterProvider.Link className={"nav-item"} to={ROUTE_PATHS.GLOBAL.ROOT}>Home</RouterProvider.Link></li>
                        <li><RouterProvider.Link className={"nav-item"} to={ROUTE_PATHS.GLOBAL.ABOUT_US}>About</RouterProvider.Link></li>
                        <li><RouterProvider.Link className={"nav-item"} to={ROUTE_PATHS.GLOBAL.SHOP}>Shop</RouterProvider.Link></li>
                        <li><RouterProvider.Link className={"nav-item"} to={ROUTE_PATHS.GLOBAL.BLOG_DETAILS}>Blog</RouterProvider.Link></li>
                        <li><RouterProvider.Link className={"nav-item"} to={ROUTE_PATHS.GLOBAL.CONTACT}>Contact</RouterProvider.Link></li>
                        <li><RouterProvider.Link className={"nav-item"} to={ROUTE_PATHS.PUBLIC.SIGN_IN}>Sign In</RouterProvider.Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MobileDrawerScreen;
