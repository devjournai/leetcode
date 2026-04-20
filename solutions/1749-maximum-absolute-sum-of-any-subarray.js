/**
 * Maximum Absolute Sum Of Any Subarray
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
      currentMaxPossibleSum + numValue,
    );
    currentMinPossibleSum = Math.min(
      numValue,
      currentMinPossibleSum + numValue,
    );
    ultimateMaxAbsSum = Math.max(
      ultimateMaxAbsSum,
      Math.abs(currentMaxPossibleSum),
      Math.abs(currentMinPossibleSum),
    );
  }

  return ultimateMaxAbsSum;
};
