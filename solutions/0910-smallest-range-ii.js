/**
 * Smallest Range II
 * Intuition: Sort, then try a split: add k to the left prefix and subtract k from the right suffix. For each split index i, the new max is `max(nums[i]+k, nums[n-1]-k)` and the new min is `min(nums[0]+k, nums[i+1]-k)`.
 * Approach: 1. Sort `nums`. Length 1 → 0. 2. Seed `minimumScore` with `nums[n-1]-nums[0]`. 3. For i in 0..n-2, compute that max-min and take the global min. 4. Return `minimumScore`.
 * Dry Run: nums = [1, 3, 6], k = 3.
 *   - Sorted same. Unmodified range 5. Split after 1: max(4,3)=4, min(4,0)=0 → 4. Split after 3: max(6,3)=6, min(4,3)=3 → 3. Answer 3.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var smallestRangeII = function (nums, k) {
  nums.sort((valA, valB) => valA - valB);

  const arraySize = nums.length;
  if (arraySize === 1) {
    return 0;
  }

  let minimumScore = nums[arraySize - 1] - nums[0];

  for (let loopCounter = 0; loopCounter < arraySize - 1; loopCounter++) {
    const firstPartHighest = nums[loopCounter] + k;
    const originalLastElementDecremented = nums[arraySize - 1] - k;
    const currentMaximumRangeValue = Math.max(
      firstPartHighest,
      originalLastElementDecremented
    );

    const originalFirstElementIncremented = nums[0] + k;
    const secondPartLowest = nums[loopCounter + 1] - k;
    const currentMinimumRangeValue = Math.min(
      originalFirstElementIncremented,
      secondPartLowest
    );

    const currentRangeDifference =
      currentMaximumRangeValue - currentMinimumRangeValue;
    minimumScore = Math.min(minimumScore, currentRangeDifference);
  }

  return minimumScore;
};
