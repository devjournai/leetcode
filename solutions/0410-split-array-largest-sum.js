/**
 * Split Array Largest Sum
 * Intuition: The minimized largest subarray sum lies between `max(nums)` and `sum(nums)`. Binary-search that value: a candidate works if we can cover the array with at most `k` segments each summing to ≤ the candidate.
 * Approach: 1. Set bounds to max element and total sum. 2. Mid = candidate. Greedy: grow `currentSegmentTotal` until overflow, then start a new segment. 3. If `segmentsFormed <= k`, record mid and search lower; else search higher. 4. Return `resultLargestSum`.
 * Dry Run: nums = [7,2,5,10,8], k = 2.
 *   - range 10..32. mid 21: 7+2+5=14 then 10+8=18, 2 segments ≤ 2 → try lower.
 *   - feasible 18: [7,2,5] and [10,8]. Return 18.
 * Time Complexity: O(N * log(S))
 * Space Complexity: O(1)
 */
var splitArray = function (nums, k) {
  let minimumPossibleLargestSum = 0;
  let maximumPossibleLargestSum = 0;

  for (let numberEntry of nums) {
    minimumPossibleLargestSum = Math.max(
      minimumPossibleLargestSum,
      numberEntry
    );
    maximumPossibleLargestSum += numberEntry;
  }

  let resultLargestSum = maximumPossibleLargestSum;
  let currentLowerBound = minimumPossibleLargestSum;
  let currentUpperBound = maximumPossibleLargestSum;

  while (currentLowerBound <= currentUpperBound) {
    const candidateLargestSum = Math.floor(
      (currentLowerBound + currentUpperBound) / 2
    );

    const canAchieveSplit = (function (
      attemptedSumLimit,
      requiredSplits,
      sourceArrayValues
    ) {
      let segmentsFormed = 1;
      let currentSegmentTotal = 0;

      for (
        let elementIndex = 0;
        elementIndex < sourceArrayValues.length;
        elementIndex++
      ) {
        const iteratedElementValue = sourceArrayValues[elementIndex];

        if (currentSegmentTotal + iteratedElementValue <= attemptedSumLimit) {
          currentSegmentTotal += iteratedElementValue;
        } else {
          segmentsFormed++;
          currentSegmentTotal = iteratedElementValue;
        }
      }
      return segmentsFormed <= requiredSplits;
    })(candidateLargestSum, k, nums);

    if (canAchieveSplit) {
      resultLargestSum = candidateLargestSum;
      currentUpperBound = candidateLargestSum - 1;
    } else {
      currentLowerBound = candidateLargestSum + 1;
    }
  }

  return resultLargestSum;
};
