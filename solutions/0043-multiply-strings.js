/**
 * Multiply Strings
 * Time Complexity: O(L1 * L2)
 * Space Complexity: O(L1 + L2)
 */
var multiply = function (num1, num2) {
    const firstNumberLength = num1.length;
    const secondNumberLength = num2.length;
    const productArray = new Array(firstNumberLength + secondNumberLength).fill(0);

    for (let outerLoopCounter = firstNumberLength - 1; outerLoopCounter >= 0; outerLoopCounter--) {
        for (let innerLoopCounter = secondNumberLength - 1; innerLoopCounter >= 0; innerLoopCounter--) {
            const digitA = parseInt(num1[outerLoopCounter]);
            const digitB = parseInt(num2[innerLoopCounter]);

            const currentDigitPosition = outerLoopCounter + innerLoopCounter + 1;
            const carryPosition = outerLoopCounter + innerLoopCounter;

            const calculationSum = digitA * digitB + productArray[currentDigitPosition];

            const carryToNextLevel = Math.floor(calculationSum / 10);
            const remainderDigit = calculationSum % 10;

            productArray[carryPosition] += carryToNextLevel;
            productArray[currentDigitPosition] = remainderDigit;
        }
    }

    const rawResultString = productArray.join('');
    const trimmedResult = rawResultString.replace(/^0+(?!$)/, '');

    return trimmedResult;
};