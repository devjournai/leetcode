/**
 * Count Good Integers in a Range
 * Intuition: Digit DP: adjacent digits differ by at most k, count in [l,r] with r<=1e15.
 * Approach: digitDP(r)-digitDP(l-1) with state pos, last digit, tight, started.
 * Dry Run: Input: l = 10, r = 15, k = 1. Output: 3.
 * Time Complexity: O(15 * 10)
 * Space Complexity: O(15 * 10)
 */
var countGoodIntegers = function (l, r, k) {
  const solve = (num) => {
    if (num < 0) return 0;
    const s = String(num);
    const memo = new Map();
    const dfs = (i, last, tight, started) => {
      if (i === s.length) return started ? 1 : 1;
      const key = [i, last, tight, started].join(",");
      if (memo.has(key)) return memo.get(key);
      const lim = tight ? Number(s[i]) : 9;
      let res = 0;
      for (let d = 0; d <= lim; d++) {
        const nt = tight && d === lim;
        if (!started && d === 0) res += dfs(i + 1, -1, nt, false);
        else if (!started) res += dfs(i + 1, d, nt, true);
        else if (Math.abs(d - last) <= k) res += dfs(i + 1, d, nt, true);
      }
      memo.set(key, res);
      return res;
    };
    return dfs(0, -1, true, false);
  };
  return solve(r) - solve(l - 1);
};
