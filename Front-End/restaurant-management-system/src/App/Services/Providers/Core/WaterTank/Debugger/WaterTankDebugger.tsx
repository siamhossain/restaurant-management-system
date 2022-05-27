import React, {Fragment, ReactElement} from 'react';
import {Debugger} from "./Debugger";
import {WaterTankDebuggerStyleSheet} from "./WaterTankDebugger.StyleSheet";
import {WTDebuggerActions} from "./Utils";

const themes = [
    'apathy',
    'apathy:inverted',
    'ashes',
    'bespin',
    'brewer',
    'bright:inverted',
    'bright',
    'chalk',
    'codeschool',
    'colors',
    'eighties',
    'embers',
    'flat',
    'google',
    'grayscale',
    'grayscale:inverted',
    'greenscreen',
    'harmonic',
    'hopscotch',
    'isotope',
    'marrakesh',
    'mocha',
    'monokai',
    'ocean',
    'paraiso',
    'pop',
    'railscasts',
    'rjv-default',
    'shapeshifter',
    'shapeshifter:inverted',
    'solarized',
    'summerfruit',
    'summerfruit:inverted',
    'threezerotwofour',
    'tomorrow',
    'tube',
    `twilight`,
];

export const WaterTankDebugger = (): ReactElement => {
    const [theme, setTheme] = React.useState(WTDebuggerActions.__getTheme());
    const [fullScreen, setFullScreen] = React.useState(WTDebuggerActions.__getFullScreen());
    const [open, setOpen] = React.useState(false);

    const handleToggle = (e: any) => {
        if (e.ctrlKey && e.shiftKey && e.keyCode === 68) {
            e.preventDefault();
            setOpen(!open);
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleToggle);
        return () => document.removeEventListener("keydown", handleToggle);
    });

    return (
        <Fragment>
            {open && (
                <div className={WaterTankDebuggerStyleSheet.classes.root(fullScreen)}>
                    <div className={"__debugger_title"}>
                        Water Tank Debugger
                        <div className={"__right_section"}>
                            <button onClick={() => {
                                const status = !fullScreen;
                                setFullScreen(status);
                                WTDebuggerActions.__logFullScreen(status);
                            }}>Toggle FullScreen
                            </button>
                            <select value={theme} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setTheme(e.target.value);
                                WTDebuggerActions.__logTheme(e.target.value);
                            }}>
                                <option>-- Select Theme --</option>
                                {themes.map((theme: string, index: number) => (
                                    <option key={index} value={theme}>{theme}</option>
                                ))}
                            </select>
                            <button onClick={() => setOpen(false)}>Close</button>
                        </div>
                    </div>
                    <div className={"__debugger_body"}>
                        <Debugger theme={theme}/>
                    </div>
                </div>
            )}
        </Fragment>
    )
}
