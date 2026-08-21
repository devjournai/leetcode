/**
 * Maximum XOR Of Subsequences
 * Intuition: X XOR Y is the XOR of the symmetric difference of the two subsequences, so the answer is the maximum subset XOR of nums. A linear basis over GF(2) represents every reachable XOR.
 * Approach: 1. Insert each number into a 31-bit XOR basis. 2. Greedily XOR basis vectors from high bit to low to maximize the value.
 * Dry Run: nums = [1, 2, 3]. Basis holds 1 and 2 (3 is dependent). Max XOR is 1 XOR 2 = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxXorSubsequences = function (nums) {
  const bitCount = 31;
  const basis = Array(bitCount).fill(0);

  for (let value of nums) {
    for (let bit = bitCount - 1; bit >= 0; bit--) {
      if (((value >> bit) & 1) === 0) {
        continue;
      }
      if (basis[bit] === 0) {
        basis[bit] = value;
        break;
      }
      value ^= basis[bit];
    }
  }

  let maxXor = 0;
  for (let bit = bitCount - 1; bit >= 0; bit--) {
    if ((maxXor ^ basis[bit]) > maxXor) {
      maxXor ^= basis[bit];
    }
  }
  return maxXor;
};
