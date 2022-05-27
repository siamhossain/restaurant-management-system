/**
 * Convert a datetime to a formatted string
 * @param inputFormat {any} date string possibly
 * @param format {'dd-mm-yyyy' | 'yyyy-mm-dd' | 'dd-mm-yyyy'}
 * @constructor
 */
export function ConvertDate(inputFormat: any, format: 'dd-mm-yyyy' | 'yyyy-mm-dd' = 'dd-mm-yyyy'): string {
    function pad(s: number) {
        return (s < 10) ? '0' + s : s;
    }

    if (inputFormat !== null && inputFormat !== '') {
        let d = new Date(inputFormat);

        if (format === 'dd-mm-yyyy') {
            return ([pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-')).toString();
        } else if (format === 'yyyy-mm-dd') {
            return ([d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')).toString();
        }

        return ([pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-')).toString();
    } else {
        return '';
    }
}