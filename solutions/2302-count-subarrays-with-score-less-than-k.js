/**
 * Count Subarrays With Score Less Than K
 * Intuition: The problem requires finding subarrays with a score (sum * length) less than k. As we extend a subarray to the right, its sum and length generally increase, leading to a higher score. If a window `[start, end]` satisfies the condition, then any shorter subarray `[start', end]` where `start' >= start` will also satisfy the condition because its sum and length will be less than or equal to the original window, hence its score will be less than or equal. This monotonic property makes a sliding window approach suitable.
 * Approach: 1. Initialize `totalSubarraysCount` to zero, `currentWindowSum` to zero, and `windowStartPointer` to zero. 2. Use a `windowEndPointer` to iterate through the array, expanding the window to the right. 3. Add `nums[windowEndPointer]` to `currentWindowSum`. 4. While the score of the current window (`currentWindowSum * (windowEndPointer - windowStartPointer + 1)`) is greater than or equal to `k`, shrink the window from the left: subtract `nums[windowStartPointer]` from `currentWindowSum` and increment `windowStartPointer`. 5. After shrinking (if necessary), all subarrays ending at `windowEndPointer` and starting from `windowStartPointer` up to `windowEndPointer` are valid. Add the count of these valid subarrays (`windowEndPointer - windowStartPointer + 1`) to `totalSubarraysCount`. 6. Increment `windowEndPointer` to continue expanding the window. 7. Return `totalSubarraysCount` once the `windowEndPointer` has traversed the entire array.
 * Dry Run: nums = [2, 1, 4], k = 10
 * Initial: totalSubarraysCount = 0, currentWindowSum = 0, windowStartPointer = 0, windowEndPointer = 0
 *
 * 1. windowEndPointer = 0 (nums[0] = 2)
 *    currentWindowSum = 0 + 2 = 2
 *    current score = 2 * (0 - 0 + 1) = 2. Is 2 >= 10? No.
 *    totalSubarraysCount = 0 + (0 - 0 + 1) = 1 (subarrays: [2])
 *    windowEndPointer = 1
 *
 * 2. windowEndPointer = 1 (nums[1] = 1)
 *    currentWindowSum = 2 + 1 = 3
 *    current score = 3 * (1 - 0 + 1) = 6. Is 6 >= 10? No.
 *    totalSubarraysCount = 1 + (1 - 0 + 1) = 3 (subarrays: [1], [2,1])
 *    windowEndPointer = 2
 *
 * 3. windowEndPointer = 2 (nums[2] = 4)
 *    currentWindowSum = 3 + 4 = 7
 *    current score = 7 * (2 - 0 + 1) = 21. Is 21 >= 10? Yes. Shrink window.
 *    - currentWindowSum = 7 - nums[0] = 7 - 2 = 5
 *    - windowStartPointer = 1
 *    - current score = 5 * (2 - 1 + 1) = 10. Is 10 >= 10? Yes. Shrink window.
 *      - currentWindowSum = 5 - nums[1] = 5 - 1 = 4
 *      - windowStartPointer = 2
 *      - current score = 4 * (2 - 2 + 1) = 4. Is 4 >= 10? No.
 *    totalSubarraysCount = 3 + (2 - 2 + 1) = 4 (subarrays: [4])
 *    windowEndPointer = 3
 *
 * Loop ends as windowEndPointer (3) is not less than nums.length (3).
 * Return totalSubarraysCount = 4.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countSubarrays = function (nums, k) {
  let totalSubarraysCount = 0;
  let currentWindowSum = 0;
  let windowStartPointer = 0;

  let windowEndPointer = 0;
  while (windowEndPointer < nums.length) {
    currentWindowSum += nums[windowEndPointer];

    while (
      currentWindowSum * (windowEndPointer - windowStartPointer + 1) >=
      k
    ) {
      currentWindowSum -= nums[windowStartPointer];
      windowStartPointer++;
    }

    totalSubarraysCount += windowEndPointer - windowStartPointer + 1;
    windowEndPointer++;
  }

  return totalSubarraysCount;
};
