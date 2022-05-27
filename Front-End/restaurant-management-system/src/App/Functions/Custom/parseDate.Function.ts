function zerofill(i: number) {
    return (i < 10 ? '0' : '') + i;
}

export function parseDate(dateString: any): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = zerofill(date.getMonth() + 1);
    const day = zerofill(date.getDate());
    return year + '/' + month + '/' + day;
}