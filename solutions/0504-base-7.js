/**
 * Base 7
 * Time Complexity: O(log|num|)
 * Space Complexity: O(log|num|)
*/
var convertToBase7 = function (num) {
    if (num === 0) {
        return "0";
    }

    let isNegativeValue = false;
    let absoluteNumber = num;

    if (num < 0) {
        isNegativeValue = true;
        absoluteNumber = -num;
    }

    let base7Digits = [];
    let currentNumber = absoluteNumber;

    while (currentNumber > 0) {
        let digitRemainder = currentNumber % 7;
        base7Digits.push(digitRemainder);
        currentNumber = Math.floor(currentNumber / 7);
    }

    let resultString = base7Digits.reverse().join('');

    if (isNegativeValue) {
        return "-" + resultString;
    } else {
        return resultString;
    }
};