/**
 * Decode Ways
 * Time Complexity: O(n)
 * Space Complexity: O(n)
*/
var numDecodings = function (s) {
    const stringLength = s.length;

    if (s === null || stringLength === 0) {
        return 0;
    }

    if (s[0] === '0') {
        return 0;
    }

    const memoizationTable = new Array(stringLength + 1).fill(0);
    memoizationTable[0] = 1;
    memoizationTable[1] = 1;

    for (let currentIteration = 2; currentIteration <= stringLength; currentIteration++) {
        const singleDigitString = s.substring(currentIteration - 1, currentIteration);
        const parsedSingleDigit = Number(singleDigitString);
        if (parsedSingleDigit >= 1 && parsedSingleDigit <= 9) {
            memoizationTable[currentIteration] += memoizationTable[currentIteration - 1];
        }

        const doubleDigitString = s.substring(currentIteration - 2, currentIteration);
        const parsedDoubleDigit = Number(doubleDigitString);
        if (parsedDoubleDigit >= 10 && parsedDoubleDigit <= 26) {
            memoizationTable[currentIteration] += memoizationTable[currentIteration - 2];
        }
    }

    return memoizationTable[stringLength];
};