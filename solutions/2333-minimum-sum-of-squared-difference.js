/**
 * Minimum Sum Of Squared Difference
 * Intuition: To minimize the sum of squared differences, we should greedily reduce the largest absolute differences first. Each operation reduces an absolute difference by 1, contributing a reduction of (2*diff - 1) to the total sum of squares. Maximizing this reduction at each step leads to the optimal solution.
 * Approach:
 * 1. Calculate the absolute differences for all pairs `|nums1[i] - nums2[i]|`.
 * 2. Use a frequency array (or map) to store the counts of each absolute difference value. Also, track the maximum absolute difference found.
 * 3. Sum `k1` and `k2` to get the total available modifications.
 * 4. Iterate downwards from the maximum absolute difference value (e.g., `maxDiff`) to `1`. For each difference value `d`:
 *    a. Determine how many items currently have this difference value (`frequency[d]`).
 *    b. Calculate how many operations are needed to reduce all these `frequency[d]` items by 1 (i.e., `frequency[d]` operations).
 *    c. Use `min(operationsNeeded, totalModifications)` to get the `actualOperationsUsed`.
 *    d. Update the frequency array: decrement `frequency[d]` by `actualOperationsUsed` and increment `frequency[d-1]` by `actualOperationsUsed`.
 *    e. Decrement `totalModifications` by `actualOperationsUsed`.
 *    f. If `totalModifications` becomes `0`, stop the iteration.
 * 5. After distributing all modifications, iterate through the updated frequency array from `0` to `maxDiff`. For each difference value `d` and its count `frequency[d]`, add `frequency[d] * d * d` to a running total.
 * 6. Return the final total sum of squared differences.
 * Dry Run:
 *   nums1 = [10,2,3], nums2 = [2,3,4], k1 = 1, k2 = 1
 *   1. Initial differences:
 *      |10-2|=8
 *      |2-3|=1
 *      |3-4|=1
 *   2. Frequency map `diffFrequencies`: {1: 2, 8: 1}. `maximumAbsoluteDiff = 8`.
 *   3. `totalKOperations = k1 + k2 = 1 + 1 = 2`.
 *   4. Reduce differences:
 *      - `currentDiffValue = 8`:
 *        `diffCountAtValue = diffFrequencies[8] = 1`.
 *        `modificationsNeeded = 1`.
 *        `actualModificationsUsed = Math.min(1, 2) = 1`.
 *        `diffFrequencies[8]` becomes `0`.
 *        `diffFrequencies[7]` becomes `1`.
 *        `totalKOperations` becomes `2 - 1 = 1`.
 *        `diffFrequencies`: {1: 2, 7: 1}.
 *      - `currentDiffValue = 7`:
 *        `diffCountAtValue = diffFrequencies[7] = 1`.
 *        `modificationsNeeded = 1`.
 *        `actualModificationsUsed = Math.min(1, 1) = 1`.
 *        `diffFrequencies[7]` becomes `0`.
 *        `diffFrequencies[6]` becomes `1`.
 *        `totalKOperations` becomes `1 - 1 = 0`.
 *        `diffFrequencies`: {1: 2, 6: 1}.
 *      - `totalKOperations` is `0`, stop.
 *   5. Calculate final sum:
 *      - For `diffBucketValue = 1`: `countInBucket = 2`. `finalSquaredSum += 2 * 1 * 1 = 2`.
 *      - For `diffBucketValue = 6`: `countInBucket = 1`. `finalSquaredSum += 1 * 6 * 6 = 36`.
 *      - Other diff values have count 0.
 *      `finalSquaredSum = 2 + 36 = 38`.
 *   6. Return `38`.
 * Time Complexity: O(N + MaxDiff)
 * Space Complexity: O(MaxDiff)
 */
var minSumSquareDiff = function (numsFirst, numsSecond, firstK, secondK) {
  const arrayLength = numsFirst.length;
  const maxPossibleDiffValue = 100000;
  const diffFrequencies = new Array(maxPossibleDiffValue + 1).fill(0);
  let maximumAbsoluteDiff = 0;

  for (
    let currentArrayIndex = 0;
    currentArrayIndex < arrayLength;
    currentArrayIndex++
  ) {
    const currentAbsoluteDiff = Math.abs(
      numsFirst[currentArrayIndex] - numsSecond[currentArrayIndex]
    );
    diffFrequencies[currentAbsoluteDiff]++;
    if (currentAbsoluteDiff > maximumAbsoluteDiff) {
      maximumAbsoluteDiff = currentAbsoluteDiff;
    }
  }

  let totalKOperations = firstK + secondK;

  for (
    let diffDecreaseValue = maximumAbsoluteDiff;
    diffDecreaseValue > 0;
    diffDecreaseValue--
  ) {
    if (totalKOperations === 0) {
      break;
    }
    if (diffFrequencies[diffDecreaseValue] > 0) {
      const currentDiffCount = diffFrequencies[diffDecreaseValue];
      const actualOperationsApplied = Math.min(
        currentDiffCount,
        totalKOperations
      );

      diffFrequencies[diffDecreaseValue] -= actualOperationsApplied;
      diffFrequencies[diffDecreaseValue - 1] += actualOperationsApplied;
      totalKOperations -= actualOperationsApplied;
    }
  }

  let finalSquaredSum = 0;
  for (
    let sumCalculationDiff = 0;
    sumCalculationDiff <= maximumAbsoluteDiff;
    sumCalculationDiff++
  ) {
    const countAtSumDiff = diffFrequencies[sumCalculationDiff];
    if (countAtSumDiff > 0) {
      finalSquaredSum +=
        countAtSumDiff * sumCalculationDiff * sumCalculationDiff;
    }
  }

  return finalSquaredSum;
};
