/**
 * Maximum Total Value of Covered Indices
 * Intuition: Each token may move left any amount but only once and cannot pass over using extra tokens incorrectly: tokens can only move left, so they occupy a decreasing assignment of positions. Greedy: assign tokens from left to the highest nums in reachable prefixes.
 * Approach: Tokens at positions of '1' can move to any index <= their origin, without two tokens on same index, preserving order. Assign i-th token (left to right) to the max nums[j] for previousTokenPos < j <= origin_i.
 * Dry Run: Input: nums = [9,2,6,1], s = 0101. Output: 15.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maximumTotalValue = function (nums, s) {
  const n = nums.length;
  const tokens = [];
  for (let i = 0; i < n; i++) if (s[i] === "1") tokens.push(i);
  if (!tokens.length) return 0;
  let prev = -1;
  let ans = 0;
  for (const t of tokens) {
    let best = -1,
      idx = t;
    for (let j = prev + 1; j <= t; j++) {
      if (nums[j] > best) {
        best = nums[j];
        idx = j;
      }
    }
    ans += best;
    prev = idx;
  }
  return ans;
};
