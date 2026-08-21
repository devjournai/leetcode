/**
 * Maximum Total Value
 * Intuition: Each extra pick of i yields value[i]-(t-1)*decay[i]. With m up to 1e9, take greedy by binary search on the last (smallest) gain, or closed form per index.
 * Approach: Binary search the minimum gain g we still take. For each i, number of times we pick is min(m, max(0, ceil of times while gain>=g)). Adjust to exact m.
 * Dry Run: Input: value=[6,5,4], decay=[2,1,1], m=4. Output: 19.
 * Time Complexity: O(N log A)
 * Space Complexity: O(N)
 */
var maximumTotalValue = function (value, decay, m) {
  const MOD = 1000000007n;
  const n = value.length;
  const countAtLeast = (g) => {
    let cnt = 0n;
    for (let i = 0; i < n; i++) {
      if (value[i] < g) continue;
      const t = Math.floor((value[i] - g) / decay[i]) + 1;
      cnt += BigInt(t);
    }
    return cnt;
  };
  let lo = -1e18,
    hi = 1e18,
    best = 0;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (countAtLeast(mid) >= BigInt(m)) {
      best = mid;
      lo = mid + 1;
    } else hi = mid - 1;
  }
  let taken = 0n,
    sum = 0n;
  for (let i = 0; i < n; i++) {
    if (value[i] < best) continue;
    let t = Math.floor((value[i] - best) / decay[i]) + 1;
    const first = BigInt(value[i]);
    const d = BigInt(decay[i]);
    const tt = BigInt(t);
    sum += (tt * (2n * first - (tt - 1n) * d)) / 2n;
    taken += tt;
  }
  const extra = taken - BigInt(m);
  sum -= extra * BigInt(best);
  return Number(((sum % MOD) + MOD) % MOD);
};
