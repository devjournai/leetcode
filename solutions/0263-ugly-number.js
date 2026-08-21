/**
 * Ugly Number
 * Intuition: Ugly numbers are positive integers whose prime factors are only 2, 3, and 5. Divide those out; what remains must be 1.
 * Approach: 1. If `num <= 0`, false. 2. While divisible by 2, divide. 3. Same for 3 and 5. 4. Return `num === 1`.
 * Dry Run: num = 6.
 *   - ÷2 → 3, ÷3 → 1. Return true. 14 → ÷2 → 7, leftover 7 → false.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var isUgly = function (num) {
  if (num <= 0) {
    return false;
  }

  while (num % 2 === 0) {
    num /= 2;
  }

  while (num % 3 === 0) {
    num /= 3;
  }

  while (num % 5 === 0) {
    num /= 5;
  }

  return num === 1;
};
