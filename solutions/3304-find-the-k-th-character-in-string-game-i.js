/**
 * Find the K-th Character in String Game I
 * Intuition: Each operation appends the next-letter version of the current string, so the k-th character is 'a' shifted by how many times that position was produced by a transform. That count equals the number of 1-bits in k-1.
 * Approach: 1. Work with 0-based index k-1. 2. Count set bits. 3. Return 'a' plus that count (mod 26 is unnecessary because k is small enough here).
 * Dry Run: k = 5 → k-1 = 4 = 100b → 1 bit → 'b'
 * Time Complexity: O(log k)
 * Space Complexity: O(1)
 */
var kthCharacter = function (k) {
  let n = k - 1;
  let bits = 0;
  while (n > 0) {
    n &= n - 1;
    bits++;
  }
  return String.fromCharCode(97 + bits);
};
