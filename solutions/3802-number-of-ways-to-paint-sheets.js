/**
 * Number of Ways to Paint Sheets
 * Intuition: Translate the problem into a direct scan or DP over the constraints, using the official examples as the correctness check.
 * Approach: 1. Parse the inputs. 2. Apply the core algorithm described in Intuition. 3. Return the required value.
 * Dry Run: Input: n = 4, limit = [3,1,2] => Output: 6
 * Time Complexity: O(M log M)
 * Space Complexity: O(M)
 */
var numberOfWays = function (n, limit) {
  const MOD = 1000000007;
  const m = limit.length;
  const cap = new Array(m);
  const need = new Array(m);
  for (let i = 0; i < m; i++) {
    cap[i] = Math.min(limit[i], n - 1);
    need[i] = Math.max(1, n - limit[i]);
  }
  const order = cap.map((c, i) => i).sort((a, b) => cap[a] - cap[b]);
  const prefix = new Array(m + 1).fill(0);
  for (let i = 0; i < m; i++) prefix[i + 1] = prefix[i] + cap[order[i]];
  let ans = 0;
  for (let j = 0; j < m; j++) {
    const nd = need[j];
    let lo = 0;
    let hi = m;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cap[order[mid]] >= nd) hi = mid;
      else lo = mid + 1;
    }
    const cnt = m - lo;
    const sumCap = prefix[m] - prefix[lo];
    let add = sumCap - cnt * (nd - 1);
    if (cap[j] >= nd) add -= cap[j] - nd + 1;
    ans = (ans + (((add % MOD) + MOD) % MOD)) % MOD;
  }
  return ans;
};
