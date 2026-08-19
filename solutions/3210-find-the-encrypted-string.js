/**
 * Find the Encrypted String
 * Intuition: Encrypting means each character moves k steps cyclically, which is a left rotation by k modulo n.
 * Approach: 1. Reduce k modulo the string length. 2. Concatenate s.slice(k) with s.slice(0, k).
 * Dry Run:
 *   s = "dart", k = 3 -> k %= 4 = 3 -> "t" + "dar" = "tdar"
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var getEncryptedString = function (s, k) {
  const rotateBy = k % s.length;
  return s.slice(rotateBy) + s.slice(0, rotateBy);
};
