/**
 * Divide Two Integers
 * Intuition: Repeated doubling (`partialDivisorChunk += partialDivisorChunk`) subtracts the largest 2^k multiple of the divisor that still fits, accumulating the matching `partialQuotientChunk`, which implements integer division without `/`.
 * Approach: 1. Clamp INT_MIN / -1 to INT_MAX. 2. Track sign via XOR of negatives; work with absolute values. 3. Return 0 if |dividend| < |divisor|. 4. While dividend still covers divisor, double the chunk until another double would not fit, then subtract and add the chunk to `overallQuotientSum`. 5. Apply sign and clamp.
 * Dry Run: dividend = 10, divisor = 3.
 *   - abs 10,3. Inner double: 3→6 (quotient 1→2); next double 12 would not fit. 10-6=4, sum=2. Loop again: 4-3=1, sum=3. Return 3.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var divide = function (dividend, divisor) {
  const MAXIMUM_POS_INTEGER = 2147483647;
  const MINIMUM_NEG_INTEGER = -2147483648;

  if (dividend === MINIMUM_NEG_INTEGER && divisor === -1) {
    return MAXIMUM_POS_INTEGER;
  }

  let isFinalResultNegative = dividend < 0 !== divisor < 0;

  let currentWorkingDividend = Math.abs(dividend);
  let currentWorkingDivisor = Math.abs(divisor);

  if (currentWorkingDividend < currentWorkingDivisor) {
    return 0;
  }

  let overallQuotientSum = 0;

  while (currentWorkingDividend >= currentWorkingDivisor) {
    let partialDivisorChunk = currentWorkingDivisor;
    let partialQuotientChunk = 1;

    while (
      currentWorkingDividend - partialDivisorChunk >=
      partialDivisorChunk
    ) {
      partialDivisorChunk += partialDivisorChunk;
      partialQuotientChunk += partialQuotientChunk;
    }

    currentWorkingDividend -= partialDivisorChunk;
    overallQuotientSum += partialQuotientChunk;
  }

  let finalCalculatedQuotient = isFinalResultNegative
    ? -overallQuotientSum
    : overallQuotientSum;

  if (finalCalculatedQuotient > MAXIMUM_POS_INTEGER) {
    return MAXIMUM_POS_INTEGER;
  }

  return finalCalculatedQuotient;
};
