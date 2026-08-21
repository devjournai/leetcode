/**
 * Frequency Of The Most Frequent Element
 * Intuition: After sorting, a window can be raised to the rightmost value using at most k increments iff sum + k ≥ value * length. Shrink from the left when that fails.
 * Approach: 1. Sort `nums`. 2. Expand `endPointer`, adding to `windowAccumulator`. 3. While the window is too expensive, subtract `nums[startPointer]` and increment start. 4. Track max window length.
 * Dry Run: nums = [1,2,4], k = 5.
 *   - Whole array: 1+2+4=7, target 4*3=12, 7+5≥12. Length 3.
 * Time Complexity: O(N log N)
 * Space Complexity: O(log N)
 */
var maxFrequency = function (nums, k) {
  nums.sort((valueA, valueB) => valueA - valueB);

  let maximumFrequency = 0;
  let windowAccumulator = 0;
  let startPointer = 0;

  for (let endPointer = 0; endPointer < nums.length; endPointer++) {
    windowAccumulator += nums[endPointer];

    while (
      windowAccumulator + k <
      nums[endPointer] * (endPointer - startPointer + 1)
    ) {
      windowAccumulator -= nums[startPointer];
      startPointer++;
    }

    maximumFrequency = Math.max(
      maximumFrequency,
      endPointer - startPointer + 1
    );
  }

  return maximumFrequency;
};
