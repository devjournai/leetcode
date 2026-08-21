/**
 * Minimum Size Subarray Sum
 * Intuition: Because all numbers are positive, a sliding window can grow until the sum is at least target, then shrink from the left to find the shortest valid window.
 * Approach: 1. Expand right, adding nums[right]. 2. While the window sum >= target, record its length and subtract nums[left], then left++. 3. Return the min length, or 0 if none.
 * Dry Run: target = 7, nums = [2,3,1,2,4,3].
 *   - Grow to [2,3,1,2] sum=8, length 4; shrink to [3,1,2] sum=6.
 *   - Add 4 → [3,1,2,4]; shrink to [2,4] then [4] (min becomes 2 after [4,3]).
 *   - [4,3] length 2 is best → return 2.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minSubArrayLen = function (targetValue, numberArray) {
  let minimumLengthAchieved = Infinity;
  let currentSumAccumulator = 0;
  let windowLeftIndex = 0;

  for (
    let windowRightIndex = 0;
    windowRightIndex < numberArray.length;
    windowRightIndex++
  ) {
    currentSumAccumulator += numberArray[windowRightIndex];

    while (currentSumAccumulator >= targetValue) {
      const currentWindowLength = windowRightIndex - windowLeftIndex + 1;
      minimumLengthAchieved = Math.min(
        minimumLengthAchieved,
        currentWindowLength
      );
      currentSumAccumulator -= numberArray[windowLeftIndex];
      windowLeftIndex++;
    }
  }

  return minimumLengthAchieved === Infinity ? 0 : minimumLengthAchieved;
};
