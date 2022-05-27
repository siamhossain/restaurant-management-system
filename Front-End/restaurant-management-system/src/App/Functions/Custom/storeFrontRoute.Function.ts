import {RemoveStartingSlash} from "@/App/Functions/Core";

interface options {
    prefix: "dropdown" | "grid" | "save" | "delete" | "",
}

export function storeFrontRoute(url: string, options: options = {
    prefix: ""
}): string {
    const prefix = options.prefix !== "" ? options.prefix + "/" : "";
    return "/store-front/" + prefix + RemoveStartingSlash(url);
}
