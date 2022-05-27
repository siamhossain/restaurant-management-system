import React, {Fragment, ReactElement} from 'react';
import {AllReportMenuScreen} from "@/Components/Screens/Private/Admin/AllReport";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";

class AllReportView extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <Fragment>
                <MainLayout>
                    <SideBarScreen/>
                    <div className="wrapper" style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                        <HeaderScreen/>
                        <div className={MainContainerStyleSheet.classes.root}>
                            <div className={"main-container"} style={{paddingTop: '10px'}}>
                                <ModuleTitleScreen
                                    moduleTitle={"All Report"}

                                />
                                <AllReportMenuScreen/>
                            </div>
                        </div>

                    </div>

                </MainLayout>
            </Fragment>
        );
    }
}

export default AllReportView;
