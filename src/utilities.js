"use strict";

/**
 * Takes duration parameter in form 00:00:00 and returns total number of seconds
 * @param {String} durationStr
 * @returns {Number}
 */
export function getVideoLengthInSeconds(durationStr) {
    const timeArr = durationStr.split(':');
    timeArr.forEach((digit, index, arr) => {
        arr[index] = parseInt(digit, 10);
    });

    return timeArr[timeArr.length - 1] +
        (timeArr.length > 1 ? timeArr[timeArr.length - 2] * 60 : 0) +
        (timeArr.length > 2 ? timeArr[timeArr.length - 3] * 3600 : 0);
}

/**
 * 
 * @param {String} dateStr
 * @returns {Date|String}
 */
export function convertStringToDateObject(dateStr) {
    if (!dateStr || dateStr.length === 0)
        return undefined;

    if (dateStr.includes('/') || dateStr.includes(','))
        return new Date(dateStr);

    return dateStr;
}

/**
 * Test if object is empty (supported by older browsers)
 * @param {Object} object
 * @returns {Boolean}
 */
export function isEmptyObject(object) {
    for (const key in object) {
        if (object.hasOwnProperty(key))
            return false;
    }
    return true;
}