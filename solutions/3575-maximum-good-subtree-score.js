/**
 * Maximum Good Subtree Score
 * Intuition: A good subset uses each digit 0-9 at most once. Values fit in a 10-bit mask. Tree DP merges children's mask-knapsacks, optionally including the current node when its digits do not collide.
 * Approach: 1. Convert each value to a digit mask, or invalid if it repeats a digit. 2. dfs(u) returns best sum for every mask in u's subtree. 3. Merge child DPs by disjoint-mask addition. 4. Sum the max over each subtree, modulo 1e9+7.
 * Dry Run: vals = [2,3], par = [-1,0]. Root subset {2,3} sum 5, child {3} sum 3, total 8.
 * Time Complexity: O(N * 3^10) roughly O(N * 1024^2) merges of sparse masks
 * Space Complexity: O(N * 1024)
 */
var goodSubtreeSum = function (vals, par) {
  const MOD = 1000000007;
  const n = vals.length;
  const children = Array.from({ length: n }, () => []);
  for (let i = 1; i < n; i++) {
    children[par[i]].push(i);
  }

  const digitMask = (value) => {
    let mask = 0;
    while (value > 0) {
      const d = value % 10;
      if (mask & (1 << d)) {
        return -1;
      }
      mask |= 1 << d;
      value = Math.floor(value / 10);
    }
    return mask;
  };

  const masks = vals.map(digitMask);
  let total = 0;

  const dfs = (u) => {
    let dp = new Array(1024).fill(-Infinity);
    dp[0] = 0;
    if (masks[u] !== -1) {
      dp[masks[u]] = Math.max(dp[masks[u]], vals[u]);
    }

    for (const v of children[u]) {
      const child = dfs(v);
      const next = dp.slice();
      for (let m1 = 0; m1 < 1024; m1++) {
        if (dp[m1] === -Infinity) {
          continue;
        }
        for (let m2 = 0; m2 < 1024; m2++) {
          if (child[m2] === -Infinity || m1 & m2) {
            continue;
          }
          next[m1 | m2] = Math.max(next[m1 | m2], dp[m1] + child[m2]);
        }
      }
      dp = next;
    }

    let best = 0;
    for (let i = 0; i < 1024; i++) {
      best = Math.max(best, dp[i]);
    }
    total = (total + best) % MOD;
    return dp;
  };

  dfs(0);
  return total;
};
