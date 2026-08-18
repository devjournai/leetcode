/**
 * Count Subarrays Where Max Element Appears At Least K Times
 * Intuition: The problem asks to count subarrays where the maximum element of the entire array appears at least K times. We can use a sliding window approach. When a window [left, right] contains the maximum element at least K times, then all subarrays starting from `left` and ending at any position `X` from `right` to `nums.length - 1` will also contain the maximum element at least K times. We can leverage this to count valid subarrays efficiently.
 * Approach: 1. First, identify the global maximum element (`maximumValue`) in the input array `nums`. 2. Initialize `currentMaximumCount` to track occurrences of `maximumValue` within the sliding window, `windowLeft` for the left boundary of the window, and `totalValidSubarrays` to accumulate the result. 3. Iterate `windowRight` from the beginning to the end of `nums`, expanding the window. 4. If `nums[windowRight]` is `maximumValue`, increment `currentMaximumCount`. 5. While `currentMaximumCount` is greater than or equal to `k`: a. Add `(nums.length - windowRight)` to `totalValidSubarrays`. This accounts for all valid subarrays that start at `windowLeft` and end at `windowRight` or any subsequent index. b. If `nums[windowLeft]` is `maximumValue`, decrement `currentMaximumCount` as it's about to leave the window. c. Increment `windowLeft` to shrink the window from the left. 6. Return `totalValidSubarrays` after the `windowRight` loop completes.
 * Dry Run: nums = [1, 3, 2, 3, 3], k = 2
 * 1. maximumValue = 3. currentMaximumCount = 0, windowLeft = 0, totalValidSubarrays = 0.
 * 2. windowRight = 0: nums[0] = 1. Not max.
 * 3. windowRight = 1: nums[1] = 3. Is max. currentMaximumCount = 1.
 * 4. windowRight = 2: nums[2] = 2. Not max.
 * 5. windowRight = 3: nums[3] = 3. Is max. currentMaximumCount = 2.
 *    While (currentMaximumCount >= k) -> (2 >= 2) is true:
 *      totalValidSubarrays += (5 - 3) = 2. (totalValidSubarrays = 2)
 *      nums[windowLeft] (nums[0]=1) is not max.
 *      windowLeft = 1.
 *    While (currentMaximumCount >= k) -> (2 >= 2) is true: (Window is now [3,2,3])
 *      totalValidSubarrays += (5 - 3) = 2. (totalValidSubarrays = 4)
 *      nums[windowLeft] (nums[1]=3) is max. currentMaximumCount = 1.
 *      windowLeft = 2.
 *    While (currentMaximumCount >= k) -> (1 >= 2) is false. Exit inner loop.
 * 6. windowRight = 4: nums[4] = 3. Is max. currentMaximumCount = 2.
 *    While (currentMaximumCount >= k) -> (2 >= 2) is true: (Window is now [2,3,3])
 *      totalValidSubarrays += (5 - 4) = 1. (totalValidSubarrays = 5)
 *      nums[windowLeft] (nums[2]=2) is not max.
 *      windowLeft = 3.
 *    While (currentMaximumCount >= k) -> (2 >= 2) is true: (Window is now [3,3])
 *      totalValidSubarrays += (5 - 4) = 1. (totalValidSubarrays = 6)
 *      nums[windowLeft] (nums[3]=3) is max. currentMaximumCount = 1.
 *      windowLeft = 4.
 *    While (currentMaximumCount >= k) -> (1 >= 2) is false. Exit inner loop.
 * 7. End of loop. Return totalValidSubarrays = 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countSubarrays = function (nums, k) {
  const maximumValue = Math.max(...nums);
  let currentMaximumCount = 0;
  let windowLeft = 0;
  let totalValidSubarrays = 0;

  for (let windowRight = 0; windowRight < nums.length; windowRight++) {
    if (nums[windowRight] === maximumValue) {
      currentMaximumCount++;
    }

    while (currentMaximumCount >= k) {
      totalValidSubarrays += nums.length - windowRight;
      if (nums[windowLeft] === maximumValue) {
        currentMaximumCount--;
      }
      windowLeft++;
    }
  }

  return totalValidSubarrays;
};
