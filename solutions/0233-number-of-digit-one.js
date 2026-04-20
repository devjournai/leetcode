/**
 * Number Of Digit One
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var countDigitOne = function (n) {
    if (n < 0) {
        return 0;
    }

    let totalOnesCount = 0;
    let currentDecimalPlace = 1;

    while (currentDecimalPlace <= n) {
        let nextDecimalPlace = currentDecimalPlace * 10;
        let fullCyclesAmount = Math.floor(n / nextDecimalPlace);
        totalOnesCount += fullCyclesAmount * currentDecimalPlace;

        let remainingPartDigits = n % nextDecimalPlace;
        let currentDigitValue = Math.floor(remainingPartDigits / currentDecimalPlace);

        if (currentDigitValue > 1) {
            totalOnesCount += currentDecimalPlace;
        } else if (currentDigitValue === 1) {
            let lowerOrderDigits = remainingPartDigits % currentDecimalPlace;
            totalOnesCount += lowerOrderDigits + 1;
        }

        currentDecimalPlace *= 10;
    }

    return totalOnesCount;
};