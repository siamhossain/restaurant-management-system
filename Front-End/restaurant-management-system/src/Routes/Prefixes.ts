import {RemoveStartingSlash} from "@/App/Functions/Core";

export const usePrefix = {
    /**
     * Global prefix binding
     * @param route {string}
     * @constructor
     */

    global: (route: string = ''): string => {
        return '/' + RemoveStartingSlash(route);
    },


    /**
     * Public prefix binding
     * @param route {string}
     * @constructor
     */
    public: (route: string = ''): string => {
        const __route: string = RemoveStartingSlash(route);
        return '/app/public' + (__route !== '' ? '/' : '') + __route;
    },

    /**
     * Private prefix binding
     * @param route {string}
     * @constructor
     */
    private: (route: string = ''): string => {
        const __route: string = RemoveStartingSlash(route);
        return '/app/private' + (__route !== '' ? '/' : '') + __route;
    },
};

/**
 * Admin prefix methods
 */
export const useAdminPrefix = {
    /**
     * Public prefix binding
     * @param route {string}
     */
    public: (route: string = ''): string => {
        const __route: string = RemoveStartingSlash(route);
        return usePrefix.public('/admin' + (__route !== '' ? '/' : '') + __route);
    },

    /**
     * Private prefix binding
     * @param route {string}
     */
    private: (route: string = ''): string => {
        const __route: string = RemoveStartingSlash(route);
        return usePrefix.private('/admin' + (__route !== '' ? '/' : '') + __route);
    },
}