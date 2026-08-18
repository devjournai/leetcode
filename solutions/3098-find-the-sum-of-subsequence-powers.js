/**
 * Find The Sum Of Subsequence Powers
 * Intuition: After sorting, the power of a subsequence is the minimum adjacent difference. Every length-`k` subsequence can be built by deciding whether to take or skip each sorted value while tracking the last taken index and the minimum adjacent gap so far. Memoizing those states sums the powers modulo 1e9+7.
 * Approach: 1. Sort `nums`. 2. Recurse on `(index, remaining, lastPickedIndex, minDiff)`. 3. Taking `nums[index]` updates `minDiff` with `nums[index] - nums[lastPickedIndex]` once at least one prior element exists. 4. When `remaining` hits 0, add `minDiff`. Skip when the array ends early. 5. Cache every state.
 * Dry Run:
 * Input: nums = [1,2,3,4], k = 3
 * 1. Sorted already. Subsequences of length 3: [1,2,3] power 1, [1,2,4] power 1, [1,3,4] power 1, [2,3,4] power 1
 * 2. Sum = 4
 * Time Complexity: O(n^2 * k * D)
 * Space Complexity: O(n^2 * k * D)
 */
var sumOfPowers = function (nums, k) {
  const MODULO = 1000000007;
  const sortedValues = nums.slice().sort((valueA, valueB) => valueA - valueB);
  const valueCount = sortedValues.length;
  const memoizedPowerSums = new Map();

  const computePowerSum = (
    currentIndex,
    remainingToPick,
    lastPickedIndex,
    minimumDifference,
  ) => {
    if (remainingToPick === 0) {
      return minimumDifference;
    }
    if (currentIndex === valueCount) {
      return 0;
    }

    const memoKey = `${currentIndex}|${remainingToPick}|${lastPickedIndex}|${minimumDifference}`;
    if (memoizedPowerSums.has(memoKey)) {
      return memoizedPowerSums.get(memoKey);
    }

    const updatedMinimumDifference =
      lastPickedIndex === -1
        ? minimumDifference
        : Math.min(
            minimumDifference,
            sortedValues[currentIndex] - sortedValues[lastPickedIndex],
          );
    const pickCurrent = computePowerSum(
      currentIndex + 1,
      remainingToPick - 1,
      currentIndex,
      updatedMinimumDifference,
    );
    const skipCurrent = computePowerSum(
      currentIndex + 1,
      remainingToPick,
      lastPickedIndex,
      minimumDifference,
    );
    const combined = (pickCurrent + skipCurrent) % MODULO;
    memoizedPowerSums.set(memoKey, combined);
    return combined;
  };

  return computePowerSum(0, k, -1, Number.POSITIVE_INFINITY);
};
