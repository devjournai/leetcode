/**
 * Maximum Length Of Subarray With Positive Product
 * Intuition: Track length of the current positive-product suffix and negative-product suffix; a zero resets; a negative swaps those lengths.
 * Approach: 1. pos=neg=0. 2. Zero: reset. Positive: pos++, neg++ if neg>0. Negative: swap via temps. 3. Max pos.
 * Dry Run: nums = [1,-2,-3,4].
 *   - Whole array product is positive; length 4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var getMaxLen = function (numbersArray) {
  let maximumLengthFound = 0;
  let currentPositives = 0;
  let currentNegatives = 0;

  for (
    let iteratorIndex = 0;
    iteratorIndex < numbersArray.length;
    iteratorIndex++
  ) {
    const currentValue = numbersArray[iteratorIndex];

    if (currentValue === 0) {
      currentPositives = 0;
      currentNegatives = 0;
    } else if (currentValue > 0) {
      currentPositives++;
      currentNegatives = currentNegatives > 0 ? currentNegatives + 1 : 0;
    } else {
      const temporaryPositive = currentPositives;
      const temporaryNegative = currentNegatives;

      currentPositives = temporaryNegative > 0 ? temporaryNegative + 1 : 0;
      currentNegatives = temporaryPositive + 1;
    }
    maximumLengthFound = Math.max(maximumLengthFound, currentPositives);
  }
  return maximumLengthFound;
};
