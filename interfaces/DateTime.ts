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
    // TODO
    let time_str = "";
    return time_str;
}

// Will return a time string formatted for user readability
export const build_time_display = (dt: DateTime): string => {
    // TODO
    let time_str = "";
    return time_str;
}

// Will produce a valid Zod date string if the input is formatted MM-DD-YYYY
export const display_to_formal = (dis: string): string => {
    const mdy = dis.split("-"); // [0] = month, [1] = day, [2] = year
    return mdy[2] + "-" + mdy[0] + "-" + mdy[1]; // Return as YYYY-MM-DD
}

// Will accept a Zod date string and a DateTime and return a new DateTime with the new date
export const formal_to_datetime = (date: string, datetime: DateTime): DateTime => {
    const ymd = date.split("-"); // [0] = year, [1] = month, [2] = day
    return {
        month: Number(ymd[1]),
        day: Number(ymd[2]),
        year: Number(ymd[0]),
        hour: datetime.hour,
        minute: datetime.minute
    }
}

export interface DateTime {
    month: number,
    day: number,
    year: number,
    hour: number,
    minute: number
}