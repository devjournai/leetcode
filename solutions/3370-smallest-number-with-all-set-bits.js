/**
 * Smallest Number With All Set Bits
 * Intuition: Numbers whose binary form is all ones are `2^b - 1`. The smallest such value ≥ n uses exactly the bit length of n, i.e. `(1 << bitLength(n)) - 1`.
 * Approach: 1. Count how many bits n needs (`while n > 0`, shift). 2. Return `(1 << bitLength) - 1`.
 * Dry Run: n = 5 (101), bitLength=3, 2^3-1=7 (111). n=7 already 111 → 7.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var smallestNumber = function (n) {
  let bitLength = 0;
  let remaining = n;
  while (remaining > 0) {
    bitLength++;
    remaining >>= 1;
  }
  return (1 << bitLength) - 1;
};
