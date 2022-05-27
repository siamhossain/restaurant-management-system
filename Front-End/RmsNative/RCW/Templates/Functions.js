const Capitalize = require('../Functions/Capitalize.Function');
const RemoveStartingSlash = require('../Functions/RemoveStartingSlash.Function');

module.exports = {
    /**
     * Index File Template Generate
     * @param indexType {"config" | "function" | "hook" | "middleware" | "serviceProvider" | "store" | "action" | "component" | "layout" | "screen" | "stylesheet"}
     * @param fileNameWithOutExtension {string}
     * @param templateName {string}
     * @constructor
     */
    IndexTemplate: function (indexType, fileNameWithOutExtension, templateName) {
        if (
            indexType === "config" ||
            indexType === "interface" ||
            indexType === "type" ||
            indexType === "function" ||
            indexType === "hook" ||
            indexType === "middleware" ||
            indexType === "serviceProvider" ||
            indexType === "store" ||
            indexType === "action" ||
            indexType === "component" ||
            indexType === "layout" ||
            indexType === "screen" ||
            indexType === "stylesheet"
        ) {
            return `export * from './${fileNameWithOutExtension}';`;
        }

        if(indexType === "view") {
            return `import ${templateName}View from './${fileNameWithOutExtension}';
export default ${templateName}View;`
        }
    },


    /**
     * Stylesheet File Template Generate
     * @param stylesheetName {string}
     * @constructor
     */
    StyleSheetTemplate: function (stylesheetName) {
        return `import { StyleSheet } from "react-native";

export const ${stylesheetName}StyleSheet = StyleSheet.create({
    /**
     * Write your styles here
     */
    root: {

    },
});`;
    },

    /**
     * Store Template Generate
     * @param storeName {string}
     * @param onCustomDir {boolean}
     * @param customTargetPath {string}
     * @param actionFilePath {string}
     * @returns {string}
     * @constructor
     */
    StoreTemplate: function (storeName, onCustomDir, customTargetPath, actionFilePath) {
        return `import { StoreProvider as Store } from '@/App/Services/Providers/Core/WaterTank';
import { actionTypes } from "${onCustomDir ? ('@/' + customTargetPath) : '@/App/WaterTank/Actions'}/${RemoveStartingSlash(actionFilePath)}";

export interface I${storeName}StoreState {
    
}
        
class ${storeName}Store extends Store {
    protected actionTypes: typeof actionTypes = actionTypes;
    public initialState: I${storeName}StoreState;
    public state: I${storeName}StoreState;
    
    constructor() {
        super();
        
        this.initialState = {
            
        };
        
        this.state = this.initialState;
    }
}

const __${storeName}Store = new ${storeName}Store();
export {__${storeName}Store as ${storeName}Store};`;
    },

    /**
     * Action Template Generate
     * @param actionName {string}
     * @param onCustomDir {boolean}
     * @param customTargetPath {string}
     * @param filePath {string}
     * @param fileName {string}
     * @returns {string}
     * @constructor
     */
    ActionTemplate: function (actionName, onCustomDir, customTargetPath, filePath, fileName) {
        return `import { PrepareNamespace } from "@/App/Functions/Core";
import { Dispatcher } from "@/App/Services/Providers/Core/WaterTank";
import { DeepPartial } from "@/App/Types/Core";
import { I${fileName}StoreState, ${fileName}Store } from "${onCustomDir ? ('@/' + customTargetPath) : '@/App/WaterTank/Stores'}/${RemoveStartingSlash(filePath)}";

/**
 * @var Namespace {string}
 * The namespace of the store access
 */
const Namespace: string = "APP/${actionName.toUpperCase()}"; //Must be unique

/**
 * @var actionTypes {object}
 * Declare your action types here
 * You can update/add action types if you need
 */
export const actionTypes: { SET_STATE: string } = {
    SET_STATE: PrepareNamespace(Namespace, 'SET_STATE'),
};

/**
 * Set the state by calling the following method
 * You can customize it if you need
 * @constructor
 * @param payload {function}
 */
export function Set${Capitalize(actionName)}StoreState(payload: (state: I${fileName}StoreState) => DeepPartial\u003cI${Capitalize(actionName)}StoreState\u003e): void {
    Dispatcher.dispatch({
        type: actionTypes.SET_STATE,
        payload: payload(${fileName}Store.__bindActionTypes\u003cI${fileName}StoreState\u003e(actionTypes).state),
    });
}`;
    },

    /**
     * Functional Component Template Generate
     * @param componentName {string}
     * @param type {'component' | 'layout' | 'screen' | 'view'}
     * @constructor
     */
    FunctionComponentTemplate: function (componentName, type) {
        const __componentName = componentName + (type === "layout"? "Layout": type === "screen" ? "Screen": type === "view" ? "View": "");
        return `import React, { Fragment, ReactElement } from 'react';

const ${__componentName} = (): ReactElement => {
    return (
        <Fragment>

        </Fragment>
    );
};

export ${type === 'component' || type === 'layout' || type === 'layout' || type === 'screen' ? '{ ' + __componentName + ' }' : type === 'view' ? 'default ' + __componentName : ''};
`;
    },

    /**
     * Functional Component Template Generate
     * @param componentName {string}
     * @param type {'layout' | 'screen' | 'view'}
     * @constructor
     */
    ClassComponentTemplate: function (componentName, type) {
        const __componentName = componentName + (type === "layout"? "Layout": type === "screen" ? "Screen": type === "view" ? "View": "");
        return `import React, {Fragment, ReactElement} from 'react';

class ${__componentName} extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <Fragment>

            </Fragment>
        );
    }
}

export ${type === 'component' || type === 'layout' || type === 'layout' || type === 'screen' ? '{ ' + __componentName + ' }' : type === 'view' ? 'default ' + __componentName : ''};
`;
    },

    /**
     * Configuration File Template Generate
     * @param configName {string}
     * @constructor
     */
    ConfigTemplate: function (configName) {
        return `export const ${configName}Config: any = {
    
};`;
    },

    /**
     * Interface File Template Generate
     * @param interfaceName {string}
     * @constructor
     */
    InterfaceTemplate: function (interfaceName) {
        return `export interface I${interfaceName} {
    
}`;
    },

    /**
     * Interface File Template Generate
     * @param typeName {string}
     * @constructor
     */
    TypeTemplate: function (typeName) {
        return `export type ${typeName} = {
    
};`;
    },

    /**
     * Function File Template Generate
     * @param functionName {string}
     * @constructor
     */
    FunctionTemplate: function (functionName) {
        return `export function ${functionName}(): void {

}`;
    },

    /**
     * Middleware File Template Generate
     * @param middlewareName {string}
     * @constructor
     */
    MiddlewareTemplate: function (middlewareName) {
        return `/**
 * Middleware ${middlewareName}
 * @return {boolean}
 */
export function ${middlewareName}(props: any) {

    return true;
}`;
    },

    /**
     * Service Provider File Template Generate
     * @param serviceProviderName {string}
     * @constructor
     */
    ServiceProviderTemplate: function (serviceProviderName) {
        return `import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";

export class ${serviceProviderName}Provider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }
}`;
    },

    /**
     * Hook File Template Generate
     * @param hookName {string}
     * @constructor
     */
    HookTemplate: function (hookName) {
        return `import { useState, useEffect } from 'react';

export function ${hookName}(): void {
    const [state, setState] = useState({});

    useEffect(() => {
        //Hook boots up
    });
}`;
    },
}
