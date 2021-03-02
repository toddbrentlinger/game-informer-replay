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
 * @param {String[]} arr
 * @returns {String}
 */
export function listArrayAsString(stringArray) {
    if (!stringArray) return null;

    // Check if argument is an array
    if (Array.isArray(stringArray)) {
        let arrayItemText = '';
        // Loop through each value of array
        for (let index = 0, arrLength = stringArray.length; index < arrLength; index++) {
            arrayItemText += stringArray[index];
            // If array length is more than 1 and index is NOT the last element
            // If array length is 2, only add ' and '
            // Else: If index is second to last element, add ', and ' Else add ', '
            if (arrLength > 1 && index !== arrLength - 1) {
                arrayItemText += (arrLength === 2) ? ' and '
                    : (index === arrLength - 2) ? ', and ' : ', ';
            }
        }
        // Return created string
        return arrayItemText;
    }

    // If argument is string, return the same string
    if (typeof stringArray === 'string')
        return stringArray;
}

/**
 * 
 * @param {Number|String} num
 * @returns {String}
 */
export function addCommasToNumber(num) {
    // If num is number, convert to string
    if (!isNaN(parseInt(num, 10)))
        num = num.toString();
    // If num is string and more than 3 digits
    if (typeof num === 'string' && num.length > 3
    ) {
        // Add comma after every 3rd index from end
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else // Else return the num as is
        return num;
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

/**
 * 
 * @param {Function} func
 * @param {Number} delay
 */
export function debounce(func, delay) {
    let debounceTimer;
    return function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
    };
}