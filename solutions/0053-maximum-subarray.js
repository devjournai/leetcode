/**
 * Maximum Subarray
 * Intuition: Kadane’s idea: the best subarray ending at i is either nums[i] alone or nums[i] plus the best subarray ending at i-1. Track the global maximum of those endings.
 * Approach: 1. Initialize both the running sum and the global max to nums[0]. 2. For each later value, set running = max(value, running + value) and update global max. 3. Return the global max.
 * Dry Run: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4].
 *   - After -2, running becomes 1 (start fresh). After -3, running is -2 then 4 starts a new run.
 *   - 4 + -1 + 2 + 1 = 6 is the peak. Return 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxSubArray = function (nums) {
  let globalMaxSum = nums[0];
  let currentContiguousSum = nums[0];

  let elementIndex = 1;
  while (elementIndex < nums.length) {
    let currentNumber = nums[elementIndex];
    currentContiguousSum = Math.max(
      currentNumber,
      currentContiguousSum + currentNumber
    );
    globalMaxSum = Math.max(globalMaxSum, currentContiguousSum);
    elementIndex++;
  }

  return globalMaxSum;
};
