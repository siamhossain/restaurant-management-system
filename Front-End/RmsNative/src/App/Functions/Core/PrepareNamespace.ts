import {RemoveStartingSlash} from "@/App/Functions/Core";

/**
 * Prepare the namespace for anything you need (ex: store | route prefix)
 * @param namespace {string}
 * @param keyword {string}
 * @param joiner {string}
 * @constructor
 */
export function PrepareNamespace(namespace: string, keyword: string, joiner: string | undefined = undefined): string {
    return (namespace + (typeof joiner === "undefined" ? '/' : joiner) + RemoveStartingSlash(keyword)).toString();
}
