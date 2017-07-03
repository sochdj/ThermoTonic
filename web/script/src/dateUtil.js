/**
 * Created by alberto on 3/15/16.
 */
function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
function toMysqlFormat(year, month, day, hours, minutes, seconds) {
    return year + "-" + twoDigits(month) + "-" + twoDigits(day) + " " + twoDigits(hours) + ":" + twoDigits(minutes) + ":" + twoDigits(seconds);
};