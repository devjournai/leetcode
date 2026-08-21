/**
 * Arithmetic Slices II Subsequence
 * Intuition: `memoizationTable[i].get(d)` counts arithmetic subsequences of length ≥2 ending at i with difference d. Each prior j contributes `countFromPrevious` new length-≥3 slices (plus a new pair i,j).
 * Approach: 1. Array of Maps per index. 2. For each i>0 and j<i, `d = nums[i]-nums[j]`. 3. Set current map[d] to previous[d]+1 plus existing. 4. Add `countFromPrevious` to the answer (pairs themselves are not counted). 5. Return the total.
 * Dry Run: [2,4,6,8]. Pairs (2,4),(4,6),(2,6) then 8 extends 2-4-6 and 4-6. Answer 3 (the length-3 and length-4 slices).
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */
var numberOfArithmeticSlices = function (numbersArray) {
  const memoizationTable = new Array(numbersArray.length)
    .fill(null)
    .map(() => new Map());
  let totalArithmeticSubsequences = 0;

  for (
    let currentElementIndex = 1;
    currentElementIndex < numbersArray.length;
    ++currentElementIndex
  ) {
    for (
      let previousElementIndex = 0;
      previousElementIndex < currentElementIndex;
      ++previousElementIndex
    ) {
      const commonDifference =
        numbersArray[currentElementIndex] - numbersArray[previousElementIndex];

      const countFromPrevious =
        memoizationTable[previousElementIndex].get(commonDifference) || 0;

      const countAtCurrent =
        (memoizationTable[currentElementIndex].get(commonDifference) || 0) +
        countFromPrevious +
        1;

      memoizationTable[currentElementIndex].set(
        commonDifference,
        countAtCurrent
      );

      totalArithmeticSubsequences += countFromPrevious;
    }
  }

  return totalArithmeticSubsequences;
};
