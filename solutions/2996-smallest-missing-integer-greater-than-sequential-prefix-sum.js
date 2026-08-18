/**
 * Smallest Missing Integer Greater Than Sequential Prefix Sum
 * Intuition: The problem requires two main steps: first, to calculate the sum of a specific sequential prefix (the one starting at index 0 and extending as long as possible), and second, to find the smallest integer, starting from this calculated sum, that is not present in the original array.
 * Approach:
 * 1. Calculate the sum of the longest sequential prefix. This prefix always starts at `nums[0]`. Initialize `currentPrefixSum` with `nums[0]`. Iterate from the second element (`i = 1`) onwards. If `nums[i]` is exactly one greater than `nums[i-1]`, add `nums[i]` to `currentPrefixSum`. If this condition is not met, the sequential prefix starting at `nums[0]` has ended, so break the loop. The final `currentPrefixSum` is our `targetSum`.
 * 2. To efficiently check for the presence of numbers, create a `Set` from all elements in the input `nums` array. This provides average `O(1)` lookup time.
 * 3. Initialize a variable, `result`, with the `targetSum`.
 * 4. Start a loop: while `result` is found within the `numSet` (meaning it's *not* missing), increment `result` by 1.
 * 5. Once `result` is no longer found in `numSet`, it means we've found the smallest integer that is greater than or equal to `targetSum` and is missing from the array. Return `result`.
 * Dry Run:
 * Input: nums = [3,4,5,1,12,14,13]
 * 1. Calculate targetSum:
 *    - Initialize `longestPrefixSum = nums[0] = 3`.
 *    - Loop `i` from 1:
 *      - `i = 1`: `nums[1] = 4`. `nums[1] === nums[0] + 1` (4 === 3 + 1) is true.
 *        - `longestPrefixSum = 3 + 4 = 7`.
 *      - `i = 2`: `nums[2] = 5`. `nums[2] === nums[1] + 1` (5 === 4 + 1) is true.
 *        - `longestPrefixSum = 7 + 5 = 12`.
 *      - `i = 3`: `nums[3] = 1`. `nums[3] === nums[2] + 1` (1 === 5 + 1) is false.
 *        - Break loop.
 *    - `targetSum` is `12`.
 * 2. Create Set:
 *    - `numSet = new Set(nums)` becomes `{1, 3, 4, 5, 12, 13, 14}`.
 * 3. Initialize `currentMissing = targetSum = 12`.
 * 4. Loop to find the missing integer:
 *    - `numSet.has(12)` is true. `currentMissing` becomes `13`.
 *    - `numSet.has(13)` is true. `currentMissing` becomes `14`.
 *    - `numSet.has(14)` is true. `currentMissing` becomes `15`.
 *    - `numSet.has(15)` is false. Exit loop.
 * 5. Return `currentMissing = 15`.
 * Time Complexity: O(N + M)
 * Space Complexity: O(N)
 */
var missingInteger = function (nums) {
  let longestPrefixSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1] + 1) {
      longestPrefixSum += nums[i];
    } else {
      break;
    }
  }

  const numSet = new Set(nums);

  let currentMissing = longestPrefixSum;
  while (numSet.has(currentMissing)) {
    currentMissing++;
  }

  return currentMissing;
};
