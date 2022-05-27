import React from 'react';
import 'react-native-gesture-handler';
import StartupComponents from "@/Startup/Components";
import StartupServices from "@/Startup/Services";
import {Routes} from "@/Routes";

const App: React.FC = () => {
    return (
        <React.Fragment>
            <StartupComponents/>
            <StartupServices>
                <Routes/>
            </StartupServices>
        </React.Fragment>
    );
};

export default App;
