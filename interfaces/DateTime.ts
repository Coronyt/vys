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

// TODO - Will return a time string formatted for Zod validation
// export const build_time = (dt: DateTime): string => {
//     let time_str = "";
//     return time_str;
// }

// Will return a time string formatted for user readability
export const build_time_display = (dt: DateTime): string => {
    let time_str = "";
    if (dt.hour < 10) {
        if (dt.hour < 1) { // Midnight (00:00 as 12:00 AM)
            time_str += String(dt.hour + 12);
        } else {
            time_str += "0" + dt.hour;
        }
    } else {
        if (dt.hour > 12) { // Afternoon (13:00 as 1:00 PM)
            if (dt.hour == 22 || dt.hour == 23) {
                // (10:00 PM - 11:00 PM)
                time_str += String(dt.hour - 12);
            } else { // (12:00 PM - 9:00 PM)
                time_str += "0" + String(dt.hour - 12);
            }
        }
        else {
            time_str += dt.hour;
        }
    }
    if (dt.minute < 10) {
        time_str += ":0" + dt.minute;
    } else {
        time_str += ":" + dt.minute;
    }
    if (dt.hour >= 12) {
        time_str += " PM"
    } else {
        time_str += " AM"
    }
    return time_str;
}

// Will produce a valid Zod date string if the input is formatted MM-DD-YYYY
export const display_to_formal_date = (dis: string): string => {
    const mdy = dis.split("-"); // [0] = month, [1] = day, [2] = year
    return mdy[2] + "-" + mdy[0] + "-" + mdy[1]; // Return as YYYY-MM-DD
}

// TODO
// TODO - AM and PM designations should not be case-sensitive
export const display_to_formal_time = (dis: string): string => {
    let h: number = Number(dis.split(" ")[0].split(":")[0]);
    let m: string = dis.split(" ")[0].split(":")[1];
    if (dis.split(" ")[1] == "PM" && h !== 12) {h += 12} // Noon
    if (dis.split(" ")[1] == "AM" && h == 12) {h -= 12} // Midnight
    if (h < 10) {
        return "0" + h + ":" + m;
    } else {
        return "" + h + ":" + m;
    }
}

// Will accept a Zod date string and a DateTime and return a new DateTime with the new date
export const formal_date_to_datetime = (date: string, datetime: DateTime): DateTime => {
    const ymd = date.split("-"); // [0] = year, [1] = month, [2] = day
    return {
        month: Number(ymd[1]),
        day: Number(ymd[2]),
        year: Number(ymd[0]),
        hour: datetime.hour,
        minute: datetime.minute
    }
}

// TODO
export const formal_time_to_datetime = (time: string, datetime: DateTime): DateTime => {
    return {
        month: datetime.month,
        day: datetime.day,
        year: datetime.year,
        hour: Number(time.split(":")[0]),
        minute: Number(time.split(":")[1])
    }
}

export interface DateTime {
    month: number,
    day: number,
    year: number,
    hour: number,
    minute: number
}