import {convertToString} from "@/App/Functions/Custom";

export function echo(value: any): string {
    try {
        if(typeof value === "undefined" || value === null) {
            return '';
        }

        return convertToString(value);

    } catch (e) {
        return '';
    }
}
