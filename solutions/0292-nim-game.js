/**
 * Nim Game
 * Intuition: From a multiple of 4 every move leaves a non-multiple, and the opponent can always restore a multiple of 4. So you win iff n is not a multiple of 4.
 * Approach: 1. Compute n % 4. 2. Return whether that remainder is not 0.
 * Dry Run: n=4 → remainder 0 → false. n=5 → remainder 1 → true.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var canWinNim = function (n) {
  let remainderCheck = n % 4;
  let isNotMultipleOfFour = remainderCheck !== 0;
  return isNotMultipleOfFour;
};
