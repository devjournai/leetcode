/**
 * Add Binary
 * Time Complexity: O(max(a.length, b.length))
 * Space Complexity: O(max(a.length, b.length))
*/
var addBinary = function (a, b) {
    let pointerA = a.length - 1;
    let pointerB = b.length - 1;
    let carryValue = 0;
    const resultDigits = [];

    while (pointerA >= 0 || pointerB >= 0 || carryValue === 1) {
        let currentDigitA = 0;
        if (pointerA >= 0) {
            currentDigitA = parseInt(a[pointerA]);
        }

        let currentDigitB = 0;
        if (pointerB >= 0) {
            currentDigitB = parseInt(b[pointerB]);
        }

        const sumIteration = currentDigitA + currentDigitB + carryValue;
        const currentResultDigit = sumIteration % 2;
        carryValue = Math.floor(sumIteration / 2);

        resultDigits.push(currentResultDigit);

        pointerA--;
        pointerB--;
    }

    return resultDigits.reverse().join('');
};