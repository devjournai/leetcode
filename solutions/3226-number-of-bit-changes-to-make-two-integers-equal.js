/**
 * Number of Bit Changes to Make Two Integers Equal
 * Intuition: Changing a 1-bit of n into 0 is allowed, but never 0 into 1. So k must be a bitwise subset of n, and the answer is how many 1-bits of n are extra.
 * Approach: 1. If (n & k) !== k, some 1-bit of k is 0 in n, so return -1. 2. Otherwise count 1-bits in n ^ k (the bits that must flip from 1 to 0).
 * Dry Run: n = 13 (1101), k = 4 (0100). n & k = 4 = k. n ^ k = 9 (1001) has two 1-bits. Answer 2.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var minChanges = function (n, k) {
  if ((n & k) !== k) {
    return -1;
  }

  let xorValue = n ^ k;
  let bitChanges = 0;
  while (xorValue > 0) {
    bitChanges += xorValue & 1;
    xorValue >>>= 1;
  }
  return bitChanges;
};
