/**
 * Plus One
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var plusOne = function (digits) {
    let arrayLength = digits.length;

    for (let currentDigitIndex = arrayLength - 1; currentDigitIndex >= 0; currentDigitIndex--) {
        if (digits[currentDigitIndex] < 9) {
            digits[currentDigitIndex]++;
            return digits;
        }
        digits[currentDigitIndex] = 0;
    }

    let extendedResult = new Array(arrayLength + 1).fill(0);
    extendedResult[0] = 1;
    return extendedResult;
};