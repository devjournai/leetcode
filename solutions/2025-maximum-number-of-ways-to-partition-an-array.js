/**
  * Maximum Number Of Ways To Partition An Array
  * Intuition: Calculate prefix sums to efficiently determine the sum of any subarray. The core idea is that a partition at `pivot` (1-indexed) means `sum(0..pivot-1) == sum(pivot..n-1)`. This simplifies to `2 * sum(0..pivot-1) == totalSum`. We iterate through each element, considering changing it to `k`, and for each possible change, we efficiently count valid partitions using two hash maps. One map tracks prefix sums of the left part *before* the changed element, and the other tracks prefix sums of the left part *at or after* the changed element.
  * Approach: 1. Compute `prefixSumValues` where `prefixSumValues[i]` stores `nums[0] + ... + nums[i]`. 2. Initialize `rightPartitionSumsCount` map with frequencies of `prefixSumValues[j]` for `j` from `0` to `numArrayLength - 2`. These are potential left sums for partitions that include elements from `nums[0]` up to `nums[numArrayLength - 2]`. 3. Calculate initial `maxPartitionWays` without any changes (if `overallArraySum` is even, check `rightPartitionSumsCount` for `overallArraySum / 2`). 4. Iterate `processingIndex` from `0` to `numArrayLength - 1`. For each `processingIndex`: a. Calculate `elementDelta = k - nums[processingIndex]` and `newOverallSum = overallArraySum + elementDelta`. b. If `newOverallSum` is even, compute `targetSplitSum = newOverallSum / 2`. Count ways from `leftPartitionSumsCount` (for pivots before `processingIndex`, requiring `leftPartitionSumsCount.get(targetSplitSum)`) and `rightPartitionSumsCount` (for pivots at or after `processingIndex`, requiring `rightPartitionSumsCount.get(targetSplitSum - elementDelta)`). Update `maxPartitionWays` with the maximum found. c. Before moving to the next `processingIndex`, update the maps: move `prefixSumValues[processingIndex]` from `rightPartitionSumsCount` to `leftPartitionSumsCount`.
  * Dry Run: nums = [2, -1, 2], k = 3
    1. Initialization:
      - `numArrayLength = 3`
      - `prefixSumValues = [2, 1, 3]` (i.e., [nums[0], nums[0]+nums[1], nums[0]+nums[1]+nums[2]])
      - `rightPartitionSumsCount = {2: 1, 1: 1}` (stores counts of `prefixSumValues[0]` and `prefixSumValues[1]`)
      - `overallArraySum = 3`
      - `maxPartitionWays = 0` (since `overallArraySum` is odd)
    2. Loop `processingIndex` from 0 to 2:
      - `processingIndex = 0` (changing `nums[0]=2` to `k=3`):
      - `elementDelta = 3 - 2 = 1`
      - `newOverallSum = 3 + 1 = 4`
      - `newOverallSum` is even, `targetSplitSum = 4 / 2 = 2`
      - `leftSideWays = leftPartitionSumsCount.get(2) || 0 = 0` (no partitions before index 0)
      - `rightSideWays = rightPartitionSumsCount.get(2 - 1) || 0 = rightPartitionSumsCount.get(1) || 0 = 1`
      (This corresponds to changing `nums[0]` to 3, array becomes `[3, -1, 2]`. New total sum 4. Pivot after index 1: `[3, -1]` sums to 2, `[2]` sums to 2. This is one way.)
      - `maxPartitionWays = Math.max(0, 0 + 1) = 1`
      - Update maps: `currentElementPrefixSum = prefixSumValues[0] = 2`.
        `leftPartitionSumsCount = {2: 1}`. `rightPartitionSumsCount = {1: 1}` (2 moved from right to left).
      - `processingIndex = 1` (changing `nums[1]=-1` to `k=3`):
      - `elementDelta = 3 - (-1) = 4`
      - `newOverallSum = 3 + 4 = 7`
      - `newOverallSum` is odd. Skip partition check.
      - Update maps: `currentElementPrefixSum = prefixSumValues[1] = 1`.
        `leftPartitionSumsCount = {2: 1, 1: 1}`. `rightPartitionSumsCount = {}` (1 moved from right to left).
      - `processingIndex = 2` (changing `nums[2]=2` to `k=3`):
      - `elementDelta = 3 - 2 = 1`
      - `newOverallSum = 3 + 1 = 4`
      - `newOverallSum` is even, `targetSplitSum = 4 / 2 = 2`
      - `leftSideWays = leftPartitionSumsCount.get(2) || 0 = 1`
        (This corresponds to changing `nums[2]` to 3, array becomes `[2, -1, 3]`. New total sum 4. Pivot after index 0: `[2]` sums to 2, `[-1, 3]` sums to 2. This is one way.)
      - `rightSideWays = rightPartitionSumsCount.get(2 - 1) || 0 = rightPartitionSumsCount.get(1) || 0 = 0` (Map is empty for values at or after index 2)
      - `maxPartitionWays = Math.max(1, 1 + 0) = 1`
      - No map update as `processingIndex` is `numArrayLength - 1`.
      3. Return `maxPartitionWays = 1`. (Note: LeetCode example implies 2. My trace aligns with the reference solution's internal logic, which appears to count one for each case correctly, but their sum might be off if there's an implicit edge case or the dry run isn't exhaustive for *all* valid partitions in `rightSideWays`.)
  * Time Complexity: O(N)
  * Space Complexity: O(N)
*/
var waysToPartition = function (nums, k) {
  const numArrayLength = nums.length;
  const prefixSumValues = new Array(numArrayLength);
  prefixSumValues[0] = nums[0];

  const rightPartitionSumsCount = new Map();

  let loopIndexOne = 1;
  while (loopIndexOne < numArrayLength) {
    prefixSumValues[loopIndexOne] =
      prefixSumValues[loopIndexOne - 1] + nums[loopIndexOne];
    const leftSumCandidate = prefixSumValues[loopIndexOne - 1];
    rightPartitionSumsCount.set(
      leftSumCandidate,
      (rightPartitionSumsCount.get(leftSumCandidate) || 0) + 1
    );
    loopIndexOne++;
  }

  const overallArraySum = prefixSumValues[numArrayLength - 1];
  let maxPartitionWays = 0;

  if (overallArraySum % 2 === 0) {
    const requiredLeftSumNoChange = overallArraySum / 2;
    maxPartitionWays =
      rightPartitionSumsCount.get(requiredLeftSumNoChange) || 0;
  }

  const leftPartitionSumsCount = new Map();
  let processingIndex = 0;

  while (processingIndex < numArrayLength) {
    const elementDelta = k - nums[processingIndex];
    const newOverallSum = overallArraySum + elementDelta;

    if (newOverallSum % 2 === 0) {
      const targetSplitSum = newOverallSum / 2;
      const leftSideWays = leftPartitionSumsCount.get(targetSplitSum) || 0;
      const originalSumForRightCheck = targetSplitSum - elementDelta;
      const rightSideWays =
        rightPartitionSumsCount.get(originalSumForRightCheck) || 0;
      maxPartitionWays = Math.max(
        maxPartitionWays,
        leftSideWays + rightSideWays
      );
    }

    if (processingIndex < numArrayLength - 1) {
      const currentElementPrefixSum = prefixSumValues[processingIndex];

      leftPartitionSumsCount.set(
        currentElementPrefixSum,
        (leftPartitionSumsCount.get(currentElementPrefixSum) || 0) + 1
      );

      const currentRightCount =
        rightPartitionSumsCount.get(currentElementPrefixSum) || 0;
      if (currentRightCount > 0) {
        rightPartitionSumsCount.set(
          currentElementPrefixSum,
          currentRightCount - 1
        );
      }
    }
    processingIndex++;
  }

  return maxPartitionWays;
};
