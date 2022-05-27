import React, {ReactElement} from "react";
import logo from '@/Static/Images/Global/logo.svg';
import '@/Static/StyleSheets/Global/ReactSplash/ReactSplash.css';

const ReactSplashView = (): ReactElement => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
        </div>
    );
};

export default ReactSplashView;
