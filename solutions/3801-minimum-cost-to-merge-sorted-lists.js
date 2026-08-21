/**
 * Minimum Cost to Merge Sorted Lists
 * Intuition: Translate the problem into a direct scan or DP over the constraints, using the official examples as the correctness check.
 * Approach: 1. Parse the inputs. 2. Apply the core algorithm described in Intuition. 3. Return the required value.
 * Dry Run: Input: lists = [[1,3,5],[2,4],[6,7,8]] => Output: 18
 * Time Complexity: O(3^N * L)
 * Space Complexity: O(2^N)
 */
var minimumCost = function (lists) {
  const n = lists.length;
  const N = 1 << n;
  const items = [];
  const len = new Array(N).fill(0);
  const median = new Array(N).fill(0);
  for (let i = 0; i < n; i++) {
    for (const x of lists[i]) items.push([x, 1 << i]);
    len[1 << i] = lists[i].length;
    median[1 << i] = lists[i][Math.floor((lists[i].length - 1) / 2)];
  }
  items.sort((a, b) => a[0] - b[0]);
  for (let mask = 1; mask < N; mask++) {
    if ((mask & (mask - 1)) === 0) continue;
    let L = 0;
    for (let i = 0; i < n; i++) if (mask & (1 << i)) L += lists[i].length;
    len[mask] = L;
    const mid = Math.floor((L - 1) / 2);
    let seen = 0;
    for (const [val, bit] of items) {
      if (mask & bit) {
        if (seen === mid) {
          median[mask] = val;
          break;
        }
        seen++;
      }
    }
  }
  const INF = Number.MAX_SAFE_INTEGER / 4;
  const dp = new Array(N).fill(INF);
  for (let i = 0; i < n; i++) dp[1 << i] = 0;
  for (let mask = 1; mask < N; mask++) {
    if ((mask & (mask - 1)) === 0) continue;
    for (let s = mask; s; s = (s - 1) & mask) {
      const other = mask ^ s;
      if (other === 0 || s > other) continue;
      if (dp[s] >= INF || dp[other] >= INF) continue;
      const cost =
        dp[s] +
        dp[other] +
        len[s] +
        len[other] +
        Math.abs(median[s] - median[other]);
      if (cost < dp[mask]) dp[mask] = cost;
    }
  }
  return dp[N - 1];
};
