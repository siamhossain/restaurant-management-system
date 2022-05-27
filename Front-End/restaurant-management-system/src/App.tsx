import React from 'react';
import {Routes} from "@/Routes";
import {GlobalStyles} from "@/Static/StyleSheets/Global/GlobalStyles";
import StartupComponents from "@/Startup/Components";
import "react-datetime/css/react-datetime.css";

const App: React.FC = () => {
    return (
        <React.Fragment>
            <GlobalStyles/>
            <Routes/>
            <StartupComponents/>
        </React.Fragment>
    );
};

export default App;
