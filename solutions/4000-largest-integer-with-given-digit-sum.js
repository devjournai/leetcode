/**
 * Largest Integer With Given Digit Sum
 * Intuition: If n  *  9 < s, even filling every digit with 9 cannot reach digit sum s, so return -1.
 * Approach: If n  *  9 < s, even filling every digit with 9 cannot reach digit sum s, so return -1. Otherwise, to maximize the integer, assign as large a digit as possible to higher places. Construct n digits from high to low: each digit takes min(s, 9), then subtract that value from s. The resulting integer is the answer (if s = 0, the result is 0).
 * Dry Run: Input: n = 2, s = 9. Output: 90.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var largestInteger = function (n, s) {
  if (n * 9 < s) {
    return -1;
  }
  let ans = 0;
  for (let i = 0; i < n; ++i) {
    const x = Math.min(s, 9);
    ans = ans * 10 + x;
    s -= x;
  }
  return ans;
};
