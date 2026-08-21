/**
 * Add Digits
 * Intuition: Repeatedly summing digits yields the digital root. For a positive integer that is `1 + (n-1) % 9` (and 0 stays 0).
 * Approach: 1. If `num === 0`, return 0. 2. Return `1 + (num - 1) % 9`.
 * Dry Run: num = 38.
 *   - 1 + 37%9 = 1+1 = 2, same as 3+8=11 then 1+1=2.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var addDigits = function (num) {
  if (num === 0) {
    return 0;
  }

  let digitalRootValue = 1 + ((num - 1) % 9);
  return digitalRootValue;
};
