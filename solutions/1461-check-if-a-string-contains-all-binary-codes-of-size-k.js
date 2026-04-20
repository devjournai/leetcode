/**
 * Check If a String Contains All Binary Codes of Size K
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
