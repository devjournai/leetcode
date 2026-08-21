/**
 * Minimum Positive Sum Subarray
 * Intuition: Subarray length is bounded by `[l, r]` and n is small enough to try every window length. Slide a window of each length and keep the smallest strictly positive sum.
 * Approach: 1. For `windowSize` from `l` to `r`, compute the first window sum. 2. Slide: drop `nums[i-windowSize]`, add `nums[i]`. 3. Track the min sum that is > 0. 4. Return that min, or -1 if none.
 * Dry Run: nums = [3, -2, 1, 4], l=2, r=3
 *   size 2: 1, -1, 5 → min positive 1
 *   size 3: 2, 3 → min 1. Answer 1.
 * Time Complexity: O(N * (R - L + 1))
 * Space Complexity: O(1)
 */
var minimumSumSubarray = function (nums, l, r) {
  let minimumPositiveSum = Infinity;

  for (let windowSize = l; windowSize <= r; windowSize++) {
    let windowSum = 0;
    for (let index = 0; index < windowSize; index++) {
      windowSum += nums[index];
    }
    if (windowSum > 0) {
      minimumPositiveSum = Math.min(minimumPositiveSum, windowSum);
    }
    for (let index = windowSize; index < nums.length; index++) {
      windowSum -= nums[index - windowSize];
      windowSum += nums[index];
      if (windowSum > 0) {
        minimumPositiveSum = Math.min(minimumPositiveSum, windowSum);
      }
    }
  }

  return minimumPositiveSum === Infinity ? -1 : minimumPositiveSum;
};
