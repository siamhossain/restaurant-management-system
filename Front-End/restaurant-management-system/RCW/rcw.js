const fs = require('fs');
const PrintAboutFirmWare = require('./Functions/PrintAboutFirmWare');
const Config = require('./Config/Default');
const templates = require('./Templates/Functions');
const Log = require('./Functions/Log.Function');
const CreateIndex = require('./Functions/CreateIndex');

const commandArgs = process.argv.splice(2);

for (let $i = 0; $i < commandArgs.length; $i++) {

    if (commandArgs[$i] === '--v') {
        Log('react', `React Clock Work`);
        console.log(`Version ${Config.Version}`);
    }

    if (commandArgs[$i] === 'create:stylesheet') {
        //Check file existence and prepare the action

        const fileName = commandArgs[$i + 1];

        let stylesheetFilePath = typeof (commandArgs[$i + 2]) === 'undefined' ? Config.StyleSheetsPath : (Config.ProjectPath + '/' + commandArgs[$i + 2]);
        if (typeof fileName !== 'undefined') {

            let __fileNameExploded = fileName.split('/');
            let __originalFileName = __fileNameExploded[__fileNameExploded.length - 1];
            let __filePathWithOutFileName = '';
            for (let i = 0; i < (__fileNameExploded.length) - 1; i++) {
                __filePathWithOutFileName += '/' + __fileNameExploded[i];
            }

            const stylesheetFilePathWithOutFileName = stylesheetFilePath + __filePathWithOutFileName;

            fs.mkdir(stylesheetFilePathWithOutFileName, {recursive: true}, (err) => {
                if (err) {
                    throw err;
                } else {
                    const $stylesheetFile = stylesheetFilePath + '/' + fileName + '.StyleSheet' + Config.FileExtension;

                    /**
                     * Create the Config file
                     * Write the template codes in it
                     */
                    fs.access($stylesheetFile, (error) => {
                        if (error) {
                            fs.writeFile($stylesheetFile, templates.StyleSheetTemplate(__originalFileName), function (error) {
                                if (error) {
                                    Log("error", `Error creating the stylesheet!` + Error);
                                } else {
                                    Log('success', `Stylesheet created successfully!`);

                                    /**
                                     * Generate the index file
                                     */
                                    if (__fileNameExploded.length > 1) {
                                        let $indexFile = stylesheetFilePathWithOutFileName + '/index' + Config.FileExtension;
                                        CreateIndex($indexFile, "stylesheet", (__originalFileName + '.StyleSheet'), __originalFileName);
                                    }
                                }
                            });
                        } else {
                            Log("error", `Stylesheet already exists!`);
                        }
                    });
                }
            });

        } else {
            Log("error", `Please input a stylesheet file name!`);
        }

        return;
    }

    if (commandArgs[$i] === 'create:store') {
        //Check file existence and prepare the action

        const fileName = commandArgs[$i + 1];
        const customTargetPath = commandArgs[$i + 2];
        const onCustomDir = typeof customTargetPath !== 'undefined';
        let storeFilePath = onCustomDir ? (Config.ProjectPath + '/' + customTargetPath) : Config.StoresPath;
        let actionFilePath = onCustomDir ? (Config.ProjectPath + '/' + customTargetPath) : Config.ActionsPath;

        if (typeof fileName !== 'undefined') {

            let __fileNameExploded = fileName.split('/');
            let __originalFileName = __fileNameExploded[__fileNameExploded.length - 1];
            let __filePathWithOutFileName = '';
            for (let i = 0; i < (__fileNameExploded.length) - 1; i++) {
                __filePathWithOutFileName += '/' + __fileNameExploded[i];
            }

            const storeFilePathWithOutFileName = storeFilePath + __filePathWithOutFileName;
            const actionFilePathWithOutFileName = actionFilePath + __filePathWithOutFileName;

            fs.mkdir(storeFilePathWithOutFileName, {recursive: true}, (err) => {
                if (err) {
                    throw err;
                } else {
                    fs.mkdir(actionFilePathWithOutFileName, {recursive: true}, (err) => {
                        if (err) {
                            throw err;
                        } else {


                            const $storeFile = storeFilePath + '/' + fileName + '.Store' + Config.FileExtension;
                            const $actionFile = actionFilePath + '/' + fileName + '.Action' + Config.FileExtension;

                            /**
                             * Create the Store file
                             * Write the template codes in it
                             */
                            fs.access($storeFile, (error) => {
                                if (error) {
                                    fs.writeFile($storeFile, templates.StoreTemplate(__originalFileName, onCustomDir, customTargetPath, (__fileNameExploded.length > 1) ? __filePathWithOutFileName : (__filePathWithOutFileName + '/' + __originalFileName + '.Action')), function (error) {
                                        if (error) {
                                            Log("error", "Error creating the store! " + Error);
                                        } else {
                                            Log("react", "Store created successfully!");

                                            /**
                                             * Generate the index file
                                             */
                                            if (__fileNameExploded.length > 1) {
                                                let $indexFile = storeFilePathWithOutFileName + '/index' + Config.FileExtension;
                                                CreateIndex($indexFile, "store", (__originalFileName + '.Store'), __originalFileName);
                                            }


                                            /**
                                             * Create the Action file
                                             * Write the template codes in it
                                             */
                                            fs.access($actionFile, (error) => {
                                                if (error) {
                                                    fs.writeFile($actionFile, templates.ActionTemplate(__originalFileName, onCustomDir, customTargetPath, __filePathWithOutFileName, __originalFileName), function (error) {
                                                        if (error) {
                                                            Log("error", "Error creating the action! " + Error);
                                                        } else {
                                                            Log("violate", "Action created successfully!");

                                                            /**
                                                             * Generate the index file
                                                             */
                                                            if (__fileNameExploded.length > 1) {
                                                                let $indexFile = actionFilePathWithOutFileName + '/index' + Config.FileExtension;
                                                                CreateIndex($indexFile, "action", (__originalFileName + '.Action'), __originalFileName);
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    Log("error", 'Action already exists!');
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    Log("error", "Store already exists!");
                                }
                            });

                        }
                    });
                }
            });

        } else {
            Log("error", "Please input a store name!");
        }

        return;
    }

    if (
        commandArgs[$i] === 'create:fc' || commandArgs[$i] === 'create:cc' ||
        commandArgs[$i] === 'create:fc-layout' || commandArgs[$i] === 'create:cc-layout' ||
        commandArgs[$i] === 'create:fc-screen' || commandArgs[$i] === 'create:cc-screen' ||
        commandArgs[$i] === 'create:fc-view' || commandArgs[$i] === 'create:cc-view'
    ) {
        //Check file existence and prepare the action

        const fileName = commandArgs[$i + 1];

        const isComponent = (commandArgs[$i] === 'create:fc' || commandArgs[$i] === 'create:cc');
        const isLayout = (commandArgs[$i] === 'create:fc-layout' || commandArgs[$i] === 'create:cc-layout');
        const isScreen = (commandArgs[$i] === 'create:fc-screen' || commandArgs[$i] === 'create:cc-screen');
        const isView = (commandArgs[$i] === 'create:fc-view' || commandArgs[$i] === 'create:cc-view');

        const reactComponentTemplateFunction = (
            commandArgs[$i] === 'create:fc' ||
            commandArgs[$i] === 'create:fc-layout' ||
            commandArgs[$i] === 'create:fc-screen' ||
            commandArgs[$i] === 'create:fc-view'
        ) ? templates.FunctionComponentTemplate : (
            commandArgs[$i] === 'create:cc' ||
            commandArgs[$i] === 'create:cc-layout' ||
            commandArgs[$i] === 'create:cc-screen' ||
            commandArgs[$i] === 'create:cc-view'
        ) ? templates.ClassComponentTemplate : templates.FunctionComponentTemplate;

        let reactComponentFilePath = typeof (commandArgs[$i + 2]) === 'undefined' ? (isComponent ? Config.ComponentsPath : isLayout ? Config.LayoutsPath : isScreen ? Config.ScreensPath : isView ? Config.ViewsPath : '') : (Config.ProjectPath + '/' + commandArgs[$i + 2]);
        if (typeof fileName !== 'undefined') {

            let __fileNameExploded = fileName.split('/');
            let __originalFileName = __fileNameExploded[__fileNameExploded.length - 1];
            let __filePathWithOutFileName = '';
            for (let i = 0; i < (__fileNameExploded.length) - 1; i++) {
                __filePathWithOutFileName += '/' + __fileNameExploded[i];
            }

            const reactComponentFilePathWithOutFileName = reactComponentFilePath + __filePathWithOutFileName;

            fs.mkdir(reactComponentFilePathWithOutFileName, {recursive: true}, (err) => {
                if (err) {
                    throw err;
                } else {
                    const $reactComponentFile = reactComponentFilePath + '/' + fileName + (isComponent ? '' : isLayout ? '.Layout' : isScreen ? '.Screen' : isView ? '.View' : '') + Config.ComponentFileExtension;

                    /**
                     * Create the React Component file
                     * Write the template codes in it
                     */
                    fs.access($reactComponentFile, (error) => {
                        if (error) {


                            fs.writeFile($reactComponentFile, reactComponentTemplateFunction(__originalFileName, isComponent ? 'component' : isLayout ? 'layout' : isScreen ? 'screen' : isView ? 'view': ''), function (error) {
                                if (error) {
                                    Log("error", `Error creating the ${isComponent ? 'component' : isLayout ? 'layout' : isScreen ? 'screen' : isView ? 'view' : ''}!` + Error);
                                } else {
                                    Log(isComponent ? 'react' : isLayout ? 'warn' : isScreen ? 'success' : isView ? 'success' : '', `${isComponent ? 'Component' : isLayout ? 'Layout' : isScreen ? 'Screen' : isView ? 'View' : ''} created successfully!`);
                                }
                            });
                        } else {
                            Log("error", `${isComponent ? 'Component' : isLayout ? 'Layout' : isScreen ? 'Screen' : isView ? 'View' : ''} already exists!`);
                        }
                    });

                    if (__fileNameExploded.length > 1) {
                        const $indexFile = reactComponentFilePathWithOutFileName + '/index' + Config.FileExtension;

                        /**
                         * Generate the Index File
                         */
                        CreateIndex($indexFile, (isComponent ? "component" : isLayout ? "layout" : isScreen ? "screen" : isView ? "view" : ""), (__originalFileName + (isComponent ? '' : isLayout ? '.Layout' : isScreen ? '.Screen' : isView ? '.View' : '')), __originalFileName)

                    }
                }
            });

        } else {
            Log("error", `Please input a ${isComponent ? 'component' : isLayout ? 'layout' : isScreen ? 'screen' : isView ? 'view' : ''} name!`);
        }

        return;
    }

    if (commandArgs[$i] === 'create:config') {
        //Check file existence and prepare the action

        const fileName = commandArgs[$i + 1];

        let configFilePath = typeof (commandArgs[$i + 2]) === 'undefined' ? Config.ConfigsPath : (Config.ProjectPath + '/' + commandArgs[$i + 2]);
        if (typeof fileName !== 'undefined') {

            let __fileNameExploded = fileName.split('/');
            let __originalFileName = __fileNameExploded[__fileNameExploded.length - 1];
            let __filePathWithOutFileName = '';
            for (let i = 0; i < (__fileNameExploded.length) - 1; i++) {
                __filePathWithOutFileName += '/' + __fileNameExploded[i];
            }

            const configFilePathWithOutFileName = configFilePath + __filePathWithOutFileName;

            fs.mkdir(configFilePathWithOutFileName, {recursive: true}, (err) => {
                if (err) {
                    throw err;
                } else {
                    const $configFile = configFilePath + '/' + fileName + '.Config' + Config.FileExtension;

                    /**
                     * Create the Config file
                     * Write the template codes in it
                     */
                    fs.access($configFile, (error) => {
                        if (error) {
                            fs.writeFile($configFile, templates.ConfigTemplate(__originalFileName), function (error) {
                                if (error) {
                                    Log("error", `Error creating the config!` + Error);
                                } else {
                                    Log('success', `Config created successfully!`);

                                    /**
                                     * Generate the index file
                                     */
                                    if (__fileNameExploded.length > 1) {
                                        const $indexFile = configFilePathWithOutFileName + '/index' + Config.FileExtension;
                                        CreateIndex($indexFile, "config", (__originalFileName + '.Config'), __originalFileName)
                                    }
                                }
                            });
                        } else {
                            Log("error", `Config already exists!`);
                        }
                    });
                }
            });

        } else {
            Log("error", `Please input a config file name!`);
        }

        return;
    }

    if (commandArgs[$i] === 'create:interface') {
        //Check file existence and prepare the action

        const fileName = commandArgs[$i + 1];

        let interfaceFilePath = typeof (commandArgs[$i + 2]) === 'undefined' ? Config.InterfacesPath : (Config.ProjectPath + '/' + commandArgs[$i + 2]);
        if (typeof fileName !== 'undefined') {

            let __fileNameExploded = fileName.split('/');
            let __originalFileName = __fileNameExploded[__fileNameExploded.length - 1];
            let __filePathWithOutFileName = '';
            for (let i = 0; i < (__fileNameExploded.length) - 1; i++) {
                __filePathWithOutFileName += '/' + __fileNameExploded[i];
            }

            const interfaceFilePathWithOutFileName = interfaceFilePath + __filePathWithOutFileName;

            fs.mkdir(interfaceFilePathWithOutFileName, {recursive: true}, (err) => {
                if (err) {
                    throw err;
                } else {
                    const $interfaceFile = interfaceFilePath + '/' + fileName + '.Interface.d' + Config.FileExtension;

                    /**
                     * Create the Config file
                     * Write the template codes in it
                     */
                    fs.access($interfaceFile, (error) => {
                        if (error) {
                            fs.writeFile($interfaceFile, templates.InterfaceTemplate(__originalFileName), function (error) {
                                if (error) {
                                    Log("error", `Error creating the interface!` + Error);
                                } else {
                                    Log('success', `Interface created successfully!`);

                                    /**
                                     * Generate the index file
                                     */
                                    if (__fileNameExploded.length > 1) {
                                        const $indexFile = interfaceFilePathWithOutFileName + '/index' + Config.FileExtension;
                                        CreateIndex($indexFile, "interface", (__originalFileName + '.Interface.d'), __originalFileName)
                                    }
                                }
                            });
                        } else {
                            Log("error", `Interface already exists!`);
                        }
                    });
                }
            });

        } else {
            Log("error", `Please input a interface file name!`);
        }

        return;
    }

    if (commandArgs[$i] === 'create:type') {
        //Check file existence and prepare the action

        const fileName = commandArgs[$i + 1];

        let typeFilePath = typeof (commandArgs[$i + 2]) === 'undefined' ? Config.TypesPath : (Config.ProjectPath + '/' + commandArgs[$i + 2]);
        if (typeof fileName !== 'undefined') {

            let __fileNameExploded = fileName.split('/');
            let __originalFileName = __fileNameExploded[__fileNameExploded.length - 1];
            let __filePathWithOutFileName = '';
            for (let i = 0; i < (__fileNameExploded.length) - 1; i++) {
                __filePathWithOutFileName += '/' + __fileNameExploded[i];
            }

            const typeFilePathWithOutFileName = typeFilePath + __filePathWithOutFileName;

            fs.mkdir(typeFilePathWithOutFileName, {recursive: true}, (err) => {
                if (err) {
                    throw err;
                } else {
                    const $typeFile = typeFilePath + '/' + fileName + '.Type.d' + Config.FileExtension;

                    /**
                     * Create the Config file
                     * Write the template codes in it
                     */
                    fs.access($typeFile, (error) => {
                        if (error) {
                            fs.writeFile($typeFile, templates.TypeTemplate(__originalFileName), function (error) {
                                if (error) {
                                    Log("error", `Error creating the type!` + Error);
                                } else {
                                    Log('success', `Type created successfully!`);

                                    /**
                                     * Generate the index file
                                     */
                                    if (__fileNameExploded.length > 1) {
                                        const $indexFile = typeFilePathWithOutFileName + '/index' + Config.FileExtension;
                                        CreateIndex($indexFile, "type", (__originalFileName + '.Type.d'), __originalFileName)
                                    }
                                }
                            });
                        } else {
                            Log("error", `Type already exists!`);
                        }
                    });
                }
            });

        } else {
            Log("error", `Please input a type file name!`);
        }

        return;
    }

    if (commandArgs[$i] === 'create:function') {
        //Check file existence and prepare the action

        const fileName = commandArgs[$i + 1];

        let functionFilePath = typeof (commandArgs[$i + 2]) === 'undefined' ? Config.FunctionsPath : (Config.ProjectPath + '/' + commandArgs[$i + 2]);
        if (typeof fileName !== 'undefined') {

            let __fileNameExploded = fileName.split('/');
            let __originalFileName = __fileNameExploded[__fileNameExploded.length - 1];
            let __filePathWithOutFileName = '';
            for (let i = 0; i < (__fileNameExploded.length) - 1; i++) {
                __filePathWithOutFileName += '/' + __fileNameExploded[i];
            }

            const functionFilePathWithOutFileName = functionFilePath + __filePathWithOutFileName;

            fs.mkdir(functionFilePathWithOutFileName, {recursive: true}, (err) => {
                if (err) {
                    throw err;
                } else {
                    const $functionFile = functionFilePath + '/' + fileName + '.Function' + Config.FileExtension;

                    /**
                     * Create the Function file
                     * Write the template codes in it
                     */
                    fs.access($functionFile, (error) => {
                        if (error) {
                            fs.writeFile($functionFile, templates.FunctionTemplate(__originalFileName), function (error) {
                                if (error) {
                                    Log("error", `Error creating the function!` + Error);
                                } else {
                                    Log('success', `Function created successfully!`);

                                    /**
                                     * Generate the index file
                                     */
                                    if (__fileNameExploded.length > 1) {
                                        const $indexFile = functionFilePathWithOutFileName + '/index' + Config.FileExtension;
                                        CreateIndex($indexFile, "function", (__originalFileName + '.Function'), __originalFileName)
                                    }
                                }
                            });
                        } else {
                            Log("error", `Function already exists!`);
                        }
                    });
                }
            });

        } else {
            Log("error", `Please input a function file name!`);
        }

        return;
    }

    if (commandArgs[$i] === 'create:middleware') {
        //Check file existence and prepare the action

        const fileName = commandArgs[$i + 1];

        let middlewareFilePath = typeof (commandArgs[$i + 2]) === 'undefined' ? Config.MiddlewaresPath : (Config.ProjectPath + '/' + commandArgs[$i + 2]);
        if (typeof fileName !== 'undefined') {

            let __fileNameExploded = fileName.split('/');
            let __originalFileName = __fileNameExploded[__fileNameExploded.length - 1];
            let __filePathWithOutFileName = '';
            for (let i = 0; i < (__fileNameExploded.length) - 1; i++) {
                __filePathWithOutFileName += '/' + __fileNameExploded[i];
            }

            const middlewareFilePathWithOutFileName = middlewareFilePath + __filePathWithOutFileName;

            fs.mkdir(middlewareFilePathWithOutFileName, {recursive: true}, (err) => {
                if (err) {
                    throw err;
                } else {
                    const $middlewareFile = middlewareFilePath + '/' + fileName + '.Middleware' + Config.FileExtension;

                    /**
                     * Create the Middleware file
                     * Write the template codes in it
                     */
                    fs.access($middlewareFile, (error) => {
                        if (error) {
                            fs.writeFile($middlewareFile, templates.MiddlewareTemplate(__originalFileName), function (error) {
                                if (error) {
                                    Log("error", `Error creating the middleware!` + Error);
                                } else {
                                    Log('success', `Middleware created successfully!`);

                                    /**
                                     * Generate the index file
                                     */
                                    if (__fileNameExploded.length > 1) {
                                        const $indexFile = middlewareFilePathWithOutFileName + '/index' + Config.FileExtension;
                                        CreateIndex($indexFile, "middleware", (__originalFileName + '.Middleware'), __originalFileName)
                                    }
                                }
                            });
                        } else {
                            Log("error", `Middleware already exists!`);
                        }
                    });
                }
            });

        } else {
            Log("error", `Please input a middleware file name!`);
        }

        return;
    }

    if (commandArgs[$i] === 'create:service-provider') {
        //Check file existence and prepare the action

        const fileName = commandArgs[$i + 1];

        let serviceProviderFilePath = typeof (commandArgs[$i + 2]) === 'undefined' ? Config.ServiceProvidersPath : (Config.ProjectPath + '/' + commandArgs[$i + 2]);
        if (typeof fileName !== 'undefined') {

            let __fileNameExploded = fileName.split('/');
            let __originalFileName = __fileNameExploded[__fileNameExploded.length - 1];
            let __filePathWithOutFileName = '';
            for (let i = 0; i < (__fileNameExploded.length) - 1; i++) {
                __filePathWithOutFileName += '/' + __fileNameExploded[i];
            }

            const serviceProviderFilePathWithOutFileName = serviceProviderFilePath + __filePathWithOutFileName;

            fs.mkdir(serviceProviderFilePathWithOutFileName, {recursive: true}, (err) => {
                if (err) {
                    throw err;
                } else {
                    const $serviceProviderFile = serviceProviderFilePath + '/' + fileName + '.Provider' + Config.FileExtension;

                    /**
                     * Create the Service Provider file
                     * Write the template codes in it
                     */
                    fs.access($serviceProviderFile, (error) => {
                        if (error) {
                            fs.writeFile($serviceProviderFile, templates.ServiceProviderTemplate(__originalFileName), function (error) {
                                if (error) {
                                    Log("error", `Error creating the service provider!` + Error);
                                } else {
                                    Log('success', `Service provider created successfully!`);

                                    /**
                                     * Generate the index file
                                     */
                                    if (__fileNameExploded.length > 1) {
                                        const $indexFile = serviceProviderFilePathWithOutFileName + '/index' + Config.FileExtension;
                                        CreateIndex($indexFile, "serviceProvider", (__originalFileName + '.Provider'), __originalFileName)
                                    }
                                }
                            });
                        } else {
                            Log("error", `Service provider already exists!`);
                        }
                    });

                }
            });

        } else {
            Log("error", `Please input a service provider file name!`);
        }

        return;
    }

    if (commandArgs[$i] === 'create:hook') {
        //Check file existence and prepare the action

        const fileName = commandArgs[$i + 1];

        let hookFilePath = typeof (commandArgs[$i + 2]) === 'undefined' ? Config.HooksPath : (Config.ProjectPath + '/' + commandArgs[$i + 2]);
        if (typeof fileName !== 'undefined') {

            let __fileNameExploded = fileName.split('/');
            let __originalFileName = __fileNameExploded[__fileNameExploded.length - 1];
            let __filePathWithOutFileName = '';
            for (let i = 0; i < (__fileNameExploded.length) - 1; i++) {
                __filePathWithOutFileName += '/' + __fileNameExploded[i];
            }

            const hookFilePathWithOutFileName = hookFilePath + __filePathWithOutFileName;

            fs.mkdir(hookFilePathWithOutFileName, {recursive: true}, (err) => {
                if (err) {
                    throw err;
                } else {
                    const $hookFile = hookFilePath + '/' + fileName + '.Hook' + Config.FileExtension;

                    /**
                     * Create the Hook file
                     * Write the template codes in it
                     */
                    fs.access($hookFile, (error) => {
                        if (error) {
                            fs.writeFile($hookFile, templates.HookTemplate(__originalFileName), function (error) {
                                if (error) {
                                    Log("error", `Error creating the hook!` + Error);
                                } else {
                                    Log('react', `Hook created successfully!`);

                                    /**
                                     * Generate the index file
                                     */
                                    if (__fileNameExploded.length > 1) {
                                        const $indexFile = hookFilePathWithOutFileName + '/index' + Config.FileExtension;
                                        CreateIndex($indexFile, "hook", (__originalFileName + '.Hook'), __originalFileName)
                                    }
                                }
                            });
                        } else {
                            Log("error", `Hook already exists!`);
                        }
                    });

                }
            });

        } else {
            Log("error", `Please input a hook file name!`);
        }

        return;
    }

    return;
}


PrintAboutFirmWare();