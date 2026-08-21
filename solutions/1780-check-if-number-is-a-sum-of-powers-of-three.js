/**
 * Check If Number Is A Sum Of Powers Of Three
 * Intuition: Distinct powers of three are exactly the base-3 digits 0 and 1. If any base-3 digit is 2, n cannot be written as such a sum.
 * Approach: 1. Repeatedly take `currentNumber % 3`. 2. Return false on remainder 2. 3. Floor-divide by 3 until 0, then return true.
 * Dry Run: n = 12.
 *   - 12%3=0, 4%3=1, 1%3=1. No 2s → true (9+3).
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var checkPowersOfThree = function (n) {
  for (
    let currentNumber = n;
    currentNumber > 0;
    currentNumber = Math.floor(currentNumber / 3)
  ) {
    let digitRemainder = currentNumber % 3;
    if (digitRemainder === 2) {
      return false;
    }
  }
  return true;
};
