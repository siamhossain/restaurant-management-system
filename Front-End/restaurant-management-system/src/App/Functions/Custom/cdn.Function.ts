import {ApiConfig} from "@/App/Config/Api";
import {RemoveEndingSlash, RemoveStartingSlash} from "@/App/Functions/Core";
import {convertToString} from "@/App/Functions/Custom";

export function cdn(path: any): string {
    return RemoveEndingSlash(ApiConfig.CDN_ROOT) + "/" + RemoveStartingSlash(convertToString(path));
}
