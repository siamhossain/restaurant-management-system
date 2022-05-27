export function convertToNumber(number: any): number {
    if(typeof number === "undefined" || number === null || isNaN(number) || isNaN(Number(number))) {
        return 0;
    }

    return Number(number);
}