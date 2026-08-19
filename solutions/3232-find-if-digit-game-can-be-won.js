/**
 * Find if Digit Game Can Be Won
 * Intuition: Alice must take either all single-digit numbers or all double-digit numbers. She wins iff those two sums differ.
 * Approach: 1. Add each num if it is < 10, otherwise subtract it. 2. Alice wins when the signed sum is not zero.
 * Dry Run: nums = [1, 2, 3, 4, 10]. Signed sum 1+2+3+4-10 = 0, Alice loses. nums = [1, 2, 3, 4, 5, 14] signed sum 15-14 = 1, Alice wins.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var canAliceWin = function (nums) {
  let signedSum = 0;
  for (const value of nums) {
    signedSum += value < 10 ? value : -value;
  }
  return signedSum !== 0;
};
