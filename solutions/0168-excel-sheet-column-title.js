/**
 * Excel Sheet Column Title
 * Time Complexity: O(log_26(columnNumber))
 * Space Complexity: O(log_26(columnNumber))
 */
var convertToTitle = function (columnNumber) {
    let currentNumber = columnNumber;
    let resultingCharacters = [];
    const asciiOffset = 65;

    while (currentNumber > 0) {
        let remainderValue = (currentNumber - 1) % 26;
        let computedChar = String.fromCharCode(asciiOffset + remainderValue);
        resultingCharacters.push(computedChar);
        currentNumber = Math.floor((currentNumber - 1) / 26);
    }

    return resultingCharacters.reverse().join('');
};