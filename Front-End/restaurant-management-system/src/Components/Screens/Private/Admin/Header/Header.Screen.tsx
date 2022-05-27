import React, {Fragment, ReactElement, useEffect} from 'react';
import {HeaderStyleSheet} from "@/Static/StyleSheets/Admin/Header";
import {IconButton, SwipeableDrawer} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {css} from "@emotion/css";
import {ChevronDownIcon} from 'evergreen-ui';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {RouterProvider} from "@/App/Services/Providers/Core/Router";
import {ROUTE_PATHS} from "@/Routes";


const HeaderScreen = (): ReactElement => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseActionMenu = () => {
        setAnchorEl(null);
    };


    return (
        <Fragment>
            <div className={HeaderStyleSheet.classes.header}>
                <IconButton className={"mobile-menu-icon"} size={"small"} onClick={toggleDrawer}>
                    <MenuIcon/>
                </IconButton>
                {/*<div className="search-bar">*/}
                {/*    <input type="text" placeholder="Search"/>*/}
                {/*</div>*/}
                <div style={{textAlign: "right", flex: 1}}>
                    <Button
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        className={HeaderStyleSheet.classes.menu}
                    >
                        <div className="user-settings">
                            <img
                                className="user-img"
                                src="https://images.unsplash.com/photo-1587918842454-870dbd18261a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=943&q=80"
                                alt={""}/>
                            <div className="user-name">User</div>
                            <ChevronDownIcon/>
                        </div>
                    </Button>
                </div>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={open}
                    onClose={handleCloseActionMenu}>
                    <RouterProvider.Link to={ROUTE_PATHS.PRIVATE.ADMIN.PROFILE}>
                        <MenuItem onClick={handleCloseActionMenu}>Profile</MenuItem>
                    </RouterProvider.Link>
                    <RouterProvider.Link to={ROUTE_PATHS.PUBLIC.ADMIN.LOGIN}> <MenuItem>Logout</MenuItem> </RouterProvider.Link>
                </Menu>
            </div>

            <SwipeableDrawer
                onClose={() => setDrawerOpen(false)}
                onOpen={() => setDrawerOpen(true)}
                open={drawerOpen}
                classes={{
                    paper: css`width: 240px; background: #fff !important;`,
                }}>
                <SideBarScreen mobile={true}/>
            </SwipeableDrawer>


        </Fragment>
    );
};

export {HeaderScreen};
