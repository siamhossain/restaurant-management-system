import React, {Fragment} from 'react';
import {RouterProvider} from '../Router';

const MiddlewareProvider = ({middleware, ...props}: any): any => {

    if (typeof middleware !== 'undefined' && middleware.length > 0) {
        for (let i = 0; i < middleware.length; i++) {
            const result = middleware[i](props);
            if (result !== true) {
                return <Fragment>{result}</Fragment>;
            }
        }
    }

    return <Fragment>{props.children}</Fragment>;
}

const __MiddlewareProvider = RouterProvider.withRouter(MiddlewareProvider);

export {__MiddlewareProvider as MiddlewareProvider};