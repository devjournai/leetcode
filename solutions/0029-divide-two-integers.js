/**
 * Divide Two Integers
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var divide = function (dividend, divisor) {
    const MAXIMUM_POS_INTEGER = 2147483647;
    const MINIMUM_NEG_INTEGER = -2147483648;

    if (dividend === MINIMUM_NEG_INTEGER && divisor === -1) {
        return MAXIMUM_POS_INTEGER;
    }

    let isFinalResultNegative = (dividend < 0) !== (divisor < 0);

    let currentWorkingDividend = Math.abs(dividend);
    let currentWorkingDivisor = Math.abs(divisor);

    if (currentWorkingDividend < currentWorkingDivisor) {
        return 0;
    }

    let overallQuotientSum = 0;

    while (currentWorkingDividend >= currentWorkingDivisor) {
        let partialDivisorChunk = currentWorkingDivisor;
        let partialQuotientChunk = 1;

        while (currentWorkingDividend - partialDivisorChunk >= partialDivisorChunk) {
            partialDivisorChunk += partialDivisorChunk;
            partialQuotientChunk += partialQuotientChunk;
        }

        currentWorkingDividend -= partialDivisorChunk;
        overallQuotientSum += partialQuotientChunk;
    }

    let finalCalculatedQuotient = isFinalResultNegative ? -overallQuotientSum : overallQuotientSum;

    if (finalCalculatedQuotient > MAXIMUM_POS_INTEGER) {
        return MAXIMUM_POS_INTEGER;
    }

    return finalCalculatedQuotient;
};