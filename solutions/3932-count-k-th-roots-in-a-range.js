/**
 * Count K-th Roots in a Range
 * Intuition: First, we check if k equals 1. If it does, the count of perfect 1st powers in the range is the count of integers in the range, which is r - l + 1.
 * Approach: First, we check if k equals 1. If it does, the count of perfect 1st powers in the range is the count of integers in the range, which is r - l + 1. Otherwise, we enumerate integers x, compute y = x^k. If y exceeds r, we stop enumeration. If y is within the range [l, r], we increment the answer by 1.
 * Dry Run: Input: l = 1, r = 9, k = 3. Output: 2.
 * Time Complexity: O(r^{1/k}cdotk)
 * Space Complexity: O(1)
 */
var countKthRoots = function (l, r, k) {
  if (k === 1) {
    return r - l + 1;
  }
  let ans = 0;
  for (let x = 0; ; x++) {
    let y = 1;
    for (let i = 0; i < k; i++) {
      y *= x;
      if (y > r) {
        break;
      }
    }
    if (y > r) {
      break;
    }
    if (l <= y && y <= r) {
      ans++;
    }
  }
  return ans;
};
