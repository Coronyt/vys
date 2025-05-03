// Will return a date string formatted for Zod validation
export const build_date = (dt: DateTime): string => {
    let date_str = `${dt.year}`;
    if (dt.month < 10) {date_str += "-0" + dt.month} else {date_str += "-" + dt.month}
    if (dt.day < 10) {date_str += "-0" + dt.day} else {date_str += "-" + dt.day}
    return date_str;
}

// Will return a date string formatted for user readability
export const build_date_display = (dt: DateTime): string => {
    let date_str = "";
    if (dt.month < 10) {date_str += "0" + dt.month} else {date_str += dt.month}
    if (dt.day < 10) {date_str += "-0" + dt.day} else {date_str += "-" + dt.day}
    return date_str += "-" + dt.year;
}

// Will return a time string formatted for Zod validation
export const build_time = (dt: DateTime): string => {
    let time_str = "";
    return time_str;
}

// Will return a time string formatted for user readability
export const build_time_display = (dt: DateTime): string => {
    let time_str = "";
    return time_str;
}

export interface DateTime {
    month: number,
    day: number,
    year: number,
    hour: number,
    minute: number
}