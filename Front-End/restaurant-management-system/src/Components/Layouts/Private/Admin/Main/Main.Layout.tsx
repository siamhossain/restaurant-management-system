import React, { Fragment, ReactElement } from 'react';
import {MainLayoutStyleSheet} from "@/Static/StyleSheets/Admin/MainLayout";

interface IMainLayoutProps {

}

const MainLayout: React.FC<IMainLayoutProps> = (props): ReactElement => {
    return (
        <Fragment>
            <div className={MainLayoutStyleSheet.classes.container}>
                    {props.children}
            </div>
        </Fragment>
    );
};

export { MainLayout };
