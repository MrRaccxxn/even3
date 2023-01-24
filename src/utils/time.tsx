import moment from "moment";

export function dateToLocal(date: string, format: string) {
    return moment(date, 'YYYY-MM-DDTHH:mm:ss.000Z').format(format)
}

export function poapDateToFormat(date: string, format: string) {
    return moment(date, 'YYYY-MM-DD HH:mm:ss').format(format)
}

export function fakepoapDateToFormat(date: string, format: string) {
    console.log('La que se mueve', date)
    // return moment(date, 'YYYY-MM-DD HH:mm:ss').format(format)
    return 'November'
}