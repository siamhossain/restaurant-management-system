import React, { Fragment, ReactElement } from 'react';
import {ProfileScreen} from "@/Components/Screens/Private/Admin/Profile";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";

const ProfileView = (): ReactElement => {
    return (
        <Fragment>
            <MainLayout>
                <SideBarScreen/>
                <div className="wrapper">
                    <HeaderScreen/>
                    <div className={MainContainerStyleSheet.classes.root}>
                        <div className={"main-container"} style={{paddingTop: '30px'}}>
                            <ProfileScreen/>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </Fragment>
    );
};

export default ProfileView;
