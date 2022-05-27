/**
 * Router redirect function
 * @param path {string}
 * @param history {object}
 * @param redirectType {"push" | "replace"}
 * @constructor
 */
export function Redirect(path: string, history: any = undefined, redirectType: "push" | "replace" = "push"): any {
    if(typeof history === "undefined") {
        if(redirectType === "replace") {
            return window.location.replace(path);
        }
        return window.location.href = path;
    }

    if(redirectType === "replace") {
        return history.replace(path);
    }

    return history.push(path);
}