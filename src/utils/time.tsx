import moment from "moment";

export function dateToLocal(date: string, format: string) {
    return moment(date, 'YYYY-MM-DDTHH:mm:ss.000Z').format(format)
}