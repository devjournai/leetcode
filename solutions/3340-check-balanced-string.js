/**
 * Check Balanced String
 * Intuition: A string of digits is balanced when the sum of even-indexed digits equals the sum of odd-indexed digits. Track a running signed sum that flips sign each digit.
 * Approach: balance starts at 0, sign starts at +1. Add sign * digit and flip sign. Return balance === 0.
 * Dry Run: num = "1234". +1 -2 +3 -4 = -2, not balanced. num = "24123". +2 -4 +1 -2 +3 = 0, balanced.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var isBalanced = function (num) {
  let balance = 0;
  let sign = 1;

  for (const char of num) {
    balance += sign * (char.charCodeAt(0) - 48);
    sign *= -1;
  }

  return balance === 0;
};
