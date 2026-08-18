/**
 * Longest Strictly Increasing Or Strictly Decreasing Subarray
 * Intuition: A strictly increasing or strictly decreasing subarray must maintain its trend. If the trend changes or elements are equal, a new potential subarray begins. We can track both increasing and decreasing trends concurrently in a single pass.
 * Approach: 1. Initialize maximum length to 0 (or 1 if array is not empty). 2. For an empty array, return 0; for a single-element array, return 1. 3. Initialize separate counters for the current strictly increasing and strictly decreasing subarray lengths, both starting at 1. 4. Iterate through the array starting from the second element. 5. In each step, compare the current element with the previous one: 6. If strictly increasing, increment the increasing counter and reset the decreasing counter to 1. 7. If strictly decreasing, increment the decreasing counter and reset the increasing counter to 1. 8. If elements are equal, reset both counters to 1, as neither increasing nor decreasing trend continues. 9. After updating counters, update the overall maximum length found so far with the maximum of the current increasing and decreasing lengths. 10. Return the final maximum length.
 * Dry Run: nums = [1, 2, 3, 2, 1]
 * initial: currentMaxLength = 1, currentIncreasingCount = 1, currentDecreasingCount = 1
 *
 * indexFirst = 1 (nums[0]=1, nums[1]=2):
 *   nums[1] (2) > nums[0] (1) -> true
 *   currentIncreasingCount becomes 2
 *   currentDecreasingCount becomes 1
 *   currentMaxLength = Math.max(1, 2, 1) = 2
 *
 * indexFirst = 2 (nums[1]=2, nums[2]=3):
 *   nums[2] (3) > nums[1] (2) -> true
 *   currentIncreasingCount becomes 3
 *   currentDecreasingCount becomes 1
 *   currentMaxLength = Math.max(2, 3, 1) = 3
 *
 * indexFirst = 3 (nums[2]=3, nums[3]=2):
 *   nums[3] (2) > nums[2] (3) -> false
 *   nums[3] (2) < nums[2] (3) -> true
 *   currentDecreasingCount becomes 2
 *   currentIncreasingCount becomes 1
 *   currentMaxLength = Math.max(3, 1, 2) = 3
 *
 * indexFirst = 4 (nums[3]=2, nums[4]=1):
 *   nums[4] (1) > nums[3] (2) -> false
 *   nums[4] (1) < nums[3] (2) -> true
 *   currentDecreasingCount becomes 3
 *   currentIncreasingCount becomes 1
 *   currentMaxLength = Math.max(3, 1, 3) = 3
 *
 * loop finishes.
 * return 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var longestMonotonicSubarray = function (nums) {
  if (nums.length === 0) {
    return 0;
  }
  if (nums.length === 1) {
    return 1;
  }

  let currentMaxLength = 1;
  let currentIncreasingCount = 1;
  let currentDecreasingCount = 1;

  for (let indexFirst = 1; indexFirst < nums.length; indexFirst++) {
    let previousEntry = nums[indexFirst - 1];
    let currentEntry = nums[indexFirst];

    if (currentEntry > previousEntry) {
      currentIncreasingCount++;
      currentDecreasingCount = 1;
    } else if (currentEntry < previousEntry) {
      currentDecreasingCount++;
      currentIncreasingCount = 1;
    } else {
      currentIncreasingCount = 1;
      currentDecreasingCount = 1;
    }
    currentMaxLength = Math.max(
      currentMaxLength,
      currentIncreasingCount,
      currentDecreasingCount,
    );
  }

  return currentMaxLength;
};
