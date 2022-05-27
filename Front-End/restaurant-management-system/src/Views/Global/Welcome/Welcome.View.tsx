import React, {Fragment, ReactElement} from 'react';
import {WelcomeStyleSheet} from "@/Static/StyleSheets/Global/Welcome";
import RcwLogo from '@/Static/Images/Global/rcw-logo.png';

const WelcomeView = (): ReactElement => {

    React.useEffect(() => {
        document.title = "React Clock Work";
    });

    return (
        <Fragment>
            <div className={WelcomeStyleSheet.classes.root}>
                <img src={RcwLogo} alt={"React Clock Work"}/>
                <div className={"title"}>React Clock Work</div>
            </div>
        </Fragment>
    );
};

export default WelcomeView;
