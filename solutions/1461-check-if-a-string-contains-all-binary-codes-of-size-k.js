/**
 * Check If a String Contains All Binary Codes of Size K
 * Intuition: There are 2^k distinct k-bit strings. Sliding windows of length k into a Set; if the set reaches 2^k we have them all.
 * Approach: 1. totalExpectedCodes = 1<<k. 2. For each start 0..n-k, add s.substring(start, start+k). 3. Early return true when size hits 2^k. 4. Otherwise false.
 * Dry Run: s = "00110110", k = 2
 *   - windows 00,01,11,10,01,11,10
 *   - set {00,01,11,10} size 4 = 2^2. Return true.
 * Time Complexity: O(N * K)
 * Space Complexity: O(2^K * K)
 */
var hasAllCodes = function (s, k) {
  const totalExpectedCodes = 1 << k;
  const foundUniqueCodes = new Set();

  for (let windowStart = 0; windowStart <= s.length - k; windowStart++) {
    const currentCodeBlock = s.substring(windowStart, windowStart + k);
    foundUniqueCodes.add(currentCodeBlock);

    if (foundUniqueCodes.size === totalExpectedCodes) {
      return true;
    }
  }

  return false;
};
