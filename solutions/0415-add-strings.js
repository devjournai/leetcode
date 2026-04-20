/**
 * Add Strings
 * Time Complexity: O(max(N, M))
 * Space Complexity: O(max(N, M))
 */
var addStrings = function (num1, num2) {
    let pointerOne = num1.length - 1;
    let pointerTwo = num2.length - 1;
    let currentCarry = 0;
    const sumComponents = [];

    while (pointerOne >= 0 || pointerTwo >= 0 || currentCarry > 0) {
        const digitFirst = pointerOne >= 0 ? (num1.charCodeAt(pointerOne--) - 48) : 0;
        const digitSecond = pointerTwo >= 0 ? (num2.charCodeAt(pointerTwo--) - 48) : 0;

        let currentTotal = digitFirst + digitSecond + currentCarry;
        sumComponents.push(currentTotal % 10);
        currentCarry = Math.floor(currentTotal / 10);
    }

    const finalOutputString = sumComponents.reverse().join('');
    return finalOutputString;
};