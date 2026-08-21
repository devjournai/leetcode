/**
 * Minimum Sum Of Values By Dividing Array
 * Intuition: Split `nums` into `m` contiguous subarrays whose AND values equal `andValues[j]`. AND only loses bits, so a running mask either still has extra bits (must extend), matches `andValues[j]` (may extend or close), or drops below it (invalid). The score adds the last element of each closed part; DP over `(index, partsUsed, runningAND)` finds the minimum score.
 * Approach: 1. Recurse on position `i`, next required AND index `j`, and current mask. 2. AND in `nums[i]`. If the mask is less than `andValues[j]`, prune. 3. If it equals, take min of continuing versus closing (add `nums[i]` and reset the mask). 4. Memoize. Return -1 if the result is infinity.
 * Dry Run:
 * Input: nums = [1,4,3,3,2], andValues = [0,3,3,2]
 * 1. One valid split is [1,4],[3],[3],[2] with ANDs 0,3,3,2 and sum 4+3+3+2=12
 * Time Complexity: O(n * m * B)
 * Space Complexity: O(n * m * B)
 */
var minimumValueSum = function (nums, andValues) {
  const INF = 1000000000;
  const FULL_MASK = -1;
  const memoizedMinimumSums = new Map();
  const numsLength = nums.length;
  const andValuesLength = andValues.length;

  const minimumSumFrom = (numsIndex, andIndex, runningMask) => {
    if (numsIndex === numsLength && andIndex === andValuesLength) {
      return 0;
    }
    if (numsIndex === numsLength || andIndex === andValuesLength) {
      return INF;
    }

    const memoKey = `${numsIndex}|${andIndex}|${runningMask}`;
    if (memoizedMinimumSums.has(memoKey)) {
      return memoizedMinimumSums.get(memoKey);
    }

    const updatedMask = runningMask & nums[numsIndex];
    let bestSum = INF;
    if (updatedMask < andValues[andIndex]) {
      bestSum = INF;
    } else if (updatedMask === andValues[andIndex]) {
      bestSum = Math.min(
        minimumSumFrom(numsIndex + 1, andIndex, updatedMask),
        nums[numsIndex] + minimumSumFrom(numsIndex + 1, andIndex + 1, FULL_MASK)
      );
    } else {
      bestSum = minimumSumFrom(numsIndex + 1, andIndex, updatedMask);
    }

    memoizedMinimumSums.set(memoKey, bestSum);
    return bestSum;
  };

  const answer = minimumSumFrom(0, 0, FULL_MASK);
  return answer >= INF ? -1 : answer;
};
