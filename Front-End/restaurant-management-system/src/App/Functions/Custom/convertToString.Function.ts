export function convertToString(string: any): string {
    if(typeof string === "undefined" || string === null) {
        return "";
    }

    return string.toString();
}