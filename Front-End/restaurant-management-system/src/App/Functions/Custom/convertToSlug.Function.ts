import {convertToString} from "@/App/Functions/Custom";

export function convertToSlug(string: string): string {
    return convertToString(string).toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
}
