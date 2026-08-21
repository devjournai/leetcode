/**
 * Minimum Cost to Convert String III
 * Intuition: Non-overlapping wildcard replacements turning source into target. Positions must match or be covered by a rule. DP on index.
 * Approach: dp[i] min cost to convert i..n. Try identity if source[i]==target[i] dp[i+1], or any rule matching at i.
 * Dry Run: Input: source=hello, target=world. Output: 7.
 * Time Complexity: O(N^2 R)
 * Space Complexity: O(N)
 */
var minimumCost = function (source, target, rules, costs) {
  const n = source.length;
  const dp = Array(n + 1).fill(Infinity);
  dp[n] = 0;
  const match = (pat, i) => {
    if (i + pat.length > n) return false;
    for (let j = 0; j < pat.length; j++) {
      if (pat[j] !== "*" && pat[j] !== source[i + j]) return false;
    }
    return true;
  };
  for (let i = n - 1; i >= 0; i--) {
    if (source[i] === target[i]) dp[i] = dp[i + 1];
    for (let r = 0; r < rules.length; r++) {
      const [pat, rep] = rules[r];
      if (i + pat.length > n) continue;
      let ok = true;
      for (let j = 0; j < pat.length; j++) {
        if (pat[j] !== "*" && pat[j] !== source[i + j]) ok = false;
        if (rep[j] !== target[i + j]) ok = false;
      }
      if (ok) {
        let stars = 0;
        for (const c of pat) if (c === "*") stars++;
        dp[i] = Math.min(dp[i], costs[r] + stars + dp[i + pat.length]);
      }
    }
  }
  return dp[0] === Infinity ? -1 : dp[0];
};
