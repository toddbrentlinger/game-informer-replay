"use strict";

export function getVideoLengthInSeconds(durationStr) {
    const timeArr = durationStr.split(':');
    timeArr.forEach((digit, index, arr) => {
        arr[index] = parseInt(digit, 10);
    });

    return timeArr[timeArr.length - 1] +
        (timeArr.length > 1 ? timeArr[timeArr.length - 2] * 60 : 0) +
        (timeArr.length > 2 ? timeArr[timeArr.length - 3] * 3600 : 0);
}