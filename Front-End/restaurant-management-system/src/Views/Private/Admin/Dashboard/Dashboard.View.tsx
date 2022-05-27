import React, { Fragment, ReactElement } from 'react';
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {MainContainerScreen} from "@/Components/Screens/Private/Admin/MainContainer";
import {LiveChatScreen} from "@/Components/Screens/Private/Admin/LiveChat";


const DashboardView = (): ReactElement => {
    return (
        <Fragment>
            <MainLayout>
                <SideBarScreen/>
                <div className="wrapper" style={{display: "", flexDirection: "column", flexGrow: 1}}>
                    <HeaderScreen/>
                    <MainContainerScreen/>
                    <LiveChatScreen/>
                </div>
            </MainLayout>
        </Fragment>
    );
};

export default DashboardView;