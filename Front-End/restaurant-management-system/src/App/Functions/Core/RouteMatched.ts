import {RemoveEndingSlash} from "./RemoveEndingSlash.Function";

/**
 * Returns true if the current and the target route matched
 * @param CurrentRoute {string}
 * @param RouteToMatch {string}
 * @constructor
 */
export function RouteMatched(CurrentRoute: string, RouteToMatch: string): boolean {
    return RemoveEndingSlash(CurrentRoute.toLowerCase()) === RouteToMatch.toLowerCase();
}