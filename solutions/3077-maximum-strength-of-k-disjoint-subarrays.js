/**
 * Maximum Strength of K Disjoint Subarrays
 * Intuition: Strength is sum(subarray_i) * (k - i + 1) with alternating signs starting positive for the first of k subarrays. DP decides, at each index, whether to skip (only when starting a new subarray), extend the current one, or close it.
 * Approach: 1. Recurse on (index, remainingSubarrays, startingFresh). 2. If remainingSubarrays is 0, return 0; if too few elements remain, return -infinity. 3. Gain for nums[i] is sign(remaining) * nums[i] * remaining. 4. Options: skip when fresh; include and continue; include and start the next subarray. 5. Memoize all three dimensions.
 * Dry Run: nums = [1, 2, 3, -1, 2], k = 3. Split [1,2,3], [-1], [2]. Remaining-k signs give 6*3 - (-1)*2 + 2*1 = 22.
 * Time Complexity: O(n * k)
 * Space Complexity: O(n * k)
 */
var maximumStrength = function (nums, k) {
  const arrayLength = nums.length;
  const NEGATIVE_INFINITY = Number.MIN_SAFE_INTEGER / 2;
  const memoizedStrength = Array.from({ length: arrayLength }, () =>
    Array.from({ length: k + 1 }, () => [undefined, undefined]),
  );

  const computeStrength = (elementIndex, remainingSubarrays, isFreshStart) => {
    if (arrayLength - elementIndex < remainingSubarrays) {
      return NEGATIVE_INFINITY;
    }
    if (remainingSubarrays === 0) {
      return 0;
    }
    if (elementIndex === arrayLength) {
      return remainingSubarrays === 0 ? 0 : NEGATIVE_INFINITY;
    }

    const freshFlag = isFreshStart ? 1 : 0;
    if (
      memoizedStrength[elementIndex][remainingSubarrays][freshFlag] !==
      undefined
    ) {
      return memoizedStrength[elementIndex][remainingSubarrays][freshFlag];
    }

    const skipStrength = isFreshStart
      ? computeStrength(elementIndex + 1, remainingSubarrays, true)
      : NEGATIVE_INFINITY;
    const currentGain =
      (remainingSubarrays % 2 === 0 ? -1 : 1) *
      nums[elementIndex] *
      remainingSubarrays;
    const includeAndContinue =
      computeStrength(elementIndex + 1, remainingSubarrays, false) +
      currentGain;
    const includeAndFreshStart =
      computeStrength(elementIndex + 1, remainingSubarrays - 1, true) +
      currentGain;

    const bestStrength = Math.max(
      skipStrength,
      includeAndContinue,
      includeAndFreshStart,
    );
    memoizedStrength[elementIndex][remainingSubarrays][freshFlag] =
      bestStrength;
    return bestStrength;
  };

  return computeStrength(0, k, true);
};
