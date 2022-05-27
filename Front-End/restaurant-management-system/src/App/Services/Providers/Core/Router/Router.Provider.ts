import {Link, Route, BrowserRouter, HashRouter, Switch, withRouter, RouteGroup, RouterLayout} from './Router';
import {RouteMatched} from '@/App/Functions/Core';

interface IRouterProvider {
    Route: any,
    BrowserRouter: typeof BrowserRouter,
    HashRouter: typeof HashRouter,
    Switch: typeof Switch,
    Link: typeof Link,
    withRouter: typeof withRouter,
    RouteMatched: typeof RouteMatched,
    RouteGroup: typeof RouteGroup,
    RouterLayout: typeof RouterLayout,
}

export const RouterProvider: IRouterProvider = {
    Route,
    BrowserRouter,
    HashRouter,
    Switch,
    Link,
    withRouter,
    RouteMatched,
    RouteGroup,
    RouterLayout,
};
