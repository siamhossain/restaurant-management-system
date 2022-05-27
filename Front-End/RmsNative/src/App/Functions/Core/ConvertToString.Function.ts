export function ConvertToString(string: string | number | null | undefined): string {
    return (typeof string !== 'undefined' && string !== null) ? string.toString() : '';
}
