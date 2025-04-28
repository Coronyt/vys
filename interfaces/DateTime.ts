export const build_date = (dt: DateTime): String => {
    // TODO - Accept a DateTime and return a valid Date string
    return "";
}

export const build_time = (dt: DateTime): String => {
    // TODO - Accept a DateTime and return a valid Time string
    return "";
}

export interface DateTime {
    month: number,
    day: number,
    year: number,
    hour: number,
    minute: number
}