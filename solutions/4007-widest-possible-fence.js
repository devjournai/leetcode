/**
 * Widest Possible Fence
 * Intuition: We first use a hash table cnt to count the number of planks of each height.
 * Approach: We first use a hash table cnt to count the number of planks of each height. For a target height h, the number of planks of height h we can obtain consists of three parts: - Using planks of height h directly, giving cnt[h] planks; - If h is even, two planks of height h/2 can be combined into one, giving lfloor cnt[h/2] / 2 rfloor planks; - For each pair of heights x + y = h with x < y, we can combine min(cnt[x], cnt[y]) planks.
 * Dry Run: Input: planks = [1,3,2,5,7,5,4,2,1]. Output: 4.
 * Time Complexity: O(n+m^2)
 * Space Complexity: O(m)
 */
var maximumWidth = function (planks) {
  const cnt = new Map();
  for (const x of planks) {
    cnt.set(x, (cnt.get(x) ?? 0) + 1);
  }

  const t = new Map();
  let ans = 0;

  for (const [x, v1] of cnt) {
    t.set(x, (t.get(x) ?? 0) + v1);
    ans = Math.max(ans, t.get(x));

    t.set(x * 2, (t.get(x * 2) ?? 0) + Math.floor(v1 / 2));
    ans = Math.max(ans, t.get(x * 2));

    for (const [y, v2] of cnt) {
      if (y > x) {
        const key = x + y;
        t.set(key, (t.get(key) ?? 0) + Math.min(v1, v2));
        ans = Math.max(ans, t.get(key));
      }
    }
  }

  return ans;
};
