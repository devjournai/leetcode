/**
 * Valid Digit Number
 * Intuition: We use a boolean variable hasX to record whether the digit x appears in n.
 * Approach: We use a boolean variable hasX to record whether the digit x appears in n. We repeatedly take the last digit of n and compare it with x. If they are equal, we set hasX to true. At the same time, we divide n by 10 to remove the last digit. When n is less than or equal to 9, it means we have checked all the digits. At this point, if hasX is true and n is not equal to x, then n is a valid number and we return true; otherwise, we return false.
 * Dry Run: Input: n = 101, x = 0. Output: true.
 * Time Complexity: O(logn)
 * Space Complexity: O(1)
 */
var validDigit = function (n, x) {
  let hasX = false;
  while (n > 9) {
    hasX = hasX || n % 10 === x;
    n = Math.floor(n / 10);
  }
  return hasX && n !== x;
};
