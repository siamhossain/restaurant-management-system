import React, { Fragment, ReactElement } from 'react';
import {ResourceCounterStyleSheet} from "@/Static/StyleSheets/Admin/ResourceCounter";
import CountUp from 'react-countup';

interface IResourceCounterScreenProps {
    icon: string,
    title: string,
    counter: number,
}

const ResourceCounterCardScreen: React.FC<IResourceCounterScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <div className={ResourceCounterStyleSheet.classes.root}>
                <div className="wrapper">
                    <div className="icon">
                        <img src={props.icon} alt=""/>
                    </div>
                    <div className="counter">
                        <h2>
                            <CountUp
                                start={0}
                                end={props.counter}
                                duration={3}
                            />
                        </h2>
                    </div>
                    <p>{props.title}</p>
                </div>
            </div>
        </Fragment>
    );
};

export { ResourceCounterCardScreen };
