/**
 * Maximum Absolute Sum Of Any Subarray
 * Intuition: Max |subarray sum| is max(max-subarray-sum, −min-subarray-sum). Run Kadane for both max and min in one pass.
 * Approach: 1. Track `currentMaxPossibleSum` and `currentMinPossibleSum`. 2. Update `ultimateMaxAbsSum` with both absolute values. 3. Return it.
 * Dry Run: nums = [1,-3,2,3,-4]
 * max Kadane 5 (2+3), min −4; abs max 5.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxAbsoluteSum = function (nums) {
  let ultimateMaxAbsSum = 0;
  let currentMaxPossibleSum = 0;
  let currentMinPossibleSum = 0;

  for (const numValue of nums) {
    currentMaxPossibleSum = Math.max(
      numValue,
      currentMaxPossibleSum + numValue
    );
    currentMinPossibleSum = Math.min(
      numValue,
      currentMinPossibleSum + numValue
    );
    ultimateMaxAbsSum = Math.max(
      ultimateMaxAbsSum,
      Math.abs(currentMaxPossibleSum),
      Math.abs(currentMinPossibleSum)
    );
  }

  return ultimateMaxAbsSum;
};
