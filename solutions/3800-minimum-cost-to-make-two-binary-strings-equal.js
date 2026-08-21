/**
 * Minimum Cost to Make Two Binary Strings Equal
 * Intuition: Implement Minimum Cost to Make Two Binary Strings Equal following the editorial simulation.
 * Approach: Implement Minimum Cost to Make Two Binary Strings Equal following the editorial simulation.
 * Dry Run: Input s = "01000", t = "10111", flipCost = 10, swapCost = 2, crossCost = 2. Output 16.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minimumCost = function (s, t, flipCost, swapCost, crossCost) {
  const diff = [0, 0];
  const n = s.length;

  for (let i = 0; i < n; i++) {
    if (s[i] !== t[i]) {
      diff[s.charCodeAt(i) - 48]++;
    }
  }

  let ans = (diff[0] + diff[1]) * flipCost;

  const mx = Math.max(diff[0], diff[1]);
  const mn = Math.min(diff[0], diff[1]);
  ans = Math.min(ans, mn * swapCost + (mx - mn) * flipCost);

  const avg = (mx + mn) >> 1;
  ans = Math.min(
    ans,
    (avg - mn) * crossCost + avg * swapCost + (mx + mn - avg * 2) * flipCost
  );

  return ans;
};
