import React, { Fragment, ReactElement } from 'react';
import {ContactCardStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/contactCard";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";


interface IContactCardScreenProps {
    src: string,
    contact_name: string,
    address: string,
}


const ContactCardScreen: React.FC<IContactCardScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <div className={ContactCardStyleSheet.classes.root}>
                <div className="card-container">
                    <div className="contact-icon">
                        <img src={props.src} alt="{}"/>
                    </div>
                    <div className="card-info">
                        <div className="card-contact-name">
                            {props.contact_name}
                        </div>
                        <div className="card-bottom">
                            <p className={"address"}>{props.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { ContactCardScreen };
