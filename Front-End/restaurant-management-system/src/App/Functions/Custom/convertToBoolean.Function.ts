import {convertToNumber} from "@/App/Functions/Custom";

export function convertToBoolean(value: any): boolean {
    let __value: boolean = false;

    if(typeof value === "number") {
        __value = convertToNumber(value) === 1;
    }

    if(typeof value === "boolean") {
        __value = value;
    }

    return __value;
}
