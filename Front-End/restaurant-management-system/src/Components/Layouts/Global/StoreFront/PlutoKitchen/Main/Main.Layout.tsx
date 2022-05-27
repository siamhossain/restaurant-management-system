import React, { Fragment, ReactElement } from 'react';
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/Footer";



interface IMainLayoutProps {
    
}

const MainLayout: React.FC<IMainLayoutProps> = (props): ReactElement => {
    return (
        <Fragment>
            <HeaderScreen/>

            <div className={""}>
                {props.children}
            </div>

            <FooterScreen/>
        </Fragment>
    );
};

export { MainLayout };
