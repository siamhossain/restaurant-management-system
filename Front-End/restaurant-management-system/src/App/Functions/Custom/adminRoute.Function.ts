import {RemoveStartingSlash} from "@/App/Functions/Core";

interface options {
    prefix: "dropdown" | "grid" | "save" | "delete" | "slug-checkpoint" | "duplicate-checkpoint" | "dashboard-counter" | "",
}

export function adminRoute(url: string, options: options = {
    prefix: ""
}): string {
    const prefix = options.prefix !== "" ? options.prefix + "/" : "";
    return "admin/" + prefix + RemoveStartingSlash(url);
}
