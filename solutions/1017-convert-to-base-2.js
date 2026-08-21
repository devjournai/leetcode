/**
 * Convert To Base 2
 * Intuition: Base -2 digits are still 0/1; the next higher digit uses (n - bit) / -2, so recurse until zero.
 * Approach: 1. Return "0" for n=0. 2. Recurse: bit = n & 1, next = (n-bit)/(-2). 3. Concatenate recursive prefix with that bit.
 * Dry Run: n = 2.
 *   - bit 0, next = 2/(-2)= -1. Then -1: bit 1, next = (-1-1)/(-2)=1. Then 1: bit 1, next 0. Bits "110".
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */
var baseNeg2 = function (n) {
  if (n === 0) {
    return "0";
  }

  function calculateBaseNeg2(currentNumberValue) {
    if (currentNumberValue === 0) {
      return "";
    }

    const bitValue = currentNumberValue & 1;
    const nextIterationValue = (currentNumberValue - bitValue) / -2;

    return calculateBaseNeg2(nextIterationValue) + bitValue.toString();
  }

  return calculateBaseNeg2(n);
};
