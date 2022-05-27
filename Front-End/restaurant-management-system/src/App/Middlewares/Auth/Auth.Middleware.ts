import {ROUTE_PATHS} from "@/Routes";
import {AuthProvider} from "@/App/Services/Providers/Core/Auth";

/**
 * Used only for the public routes
 * @return {boolean}
 */
export function NON_LOGGED_USER(props: any) {
    if (new AuthProvider().check()) {
        return props.history.replace(ROUTE_PATHS.PRIVATE.ADMIN.ROOT);
    }

    return true;
}

/**
 * Used only for the private routes
 * @return {boolean}
 */
export function LOGGED_USER(props: any) {
    if (!new AuthProvider().check()) {
        return props.history.replace(ROUTE_PATHS.PUBLIC.ADMIN.ROOT);
    }

    return true;
}

/**
 * Used only for the public routes
 * @return {boolean}
 */
export function STORE_FRONT_NON_LOGGED_USER(props: any) {
    if (new AuthProvider("customer").check()) {
        //return props.history.replace(ROUTE_PATHS.PRIVATE.STORE_FRONT.PROFILE);
    }

    return true;
}

/**
 * Used only for the private routes
 * @return {boolean}
 */
export function STORE_FRONT_LOGGED_USER(props: any) {
    if (!new AuthProvider("customer").check()) {
        //return props.history.replace(ROUTE_PATHS.PUBLIC.STORE_FRONT.LOGIN);
    }

    return true;
}
