import React, { Fragment, ReactElement } from 'react';
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/About/Footer";



interface IMainLayoutProps {
    
}

const GetInTouchMainLayout: React.FC<IMainLayoutProps> = (props): ReactElement => {
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

export { GetInTouchMainLayout };
