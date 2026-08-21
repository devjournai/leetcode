/**
 * Minimum Operations to Achieve At Least K Peaks
 * Intuition: Translate the problem into a direct scan or DP over the constraints, using the official examples as the correctness check.
 * Approach: 1. Parse the inputs. 2. Apply the core algorithm described in Intuition. 3. Return the required value.
 * Dry Run: Input: nums = [2,1,2], k = 1 => Output: 1
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var minOperations = function (nums, k) {
  const n = nums.length;
  if (k === 0) return 0;
  if (k > Math.floor(n / 2)) return -1;
  const cost = new Array(n);
  for (let i = 0; i < n; i++) {
    const left = nums[(i - 1 + n) % n];
    const right = nums[(i + 1) % n];
    cost[i] = Math.max(0, Math.max(left, right) + 1 - nums[i]);
  }
  const INF = 1e18;
  const minAtLeast = (lo, hi, need) => {
    if (need <= 0) return 0;
    if (lo > hi) return INF;
    const maxP = Math.floor((hi - lo + 2) / 2);
    if (need > maxP) return INF;
    let take = new Array(maxP + 1).fill(INF);
    let skip = new Array(maxP + 1).fill(INF);
    skip[0] = 0;
    for (let i = lo; i <= hi; i++) {
      const nTake = new Array(maxP + 1).fill(INF);
      const nSkip = new Array(maxP + 1).fill(INF);
      for (let j = 0; j <= maxP; j++) {
        nSkip[j] = Math.min(skip[j], take[j]);
        if (j > 0 && skip[j - 1] < INF) nTake[j] = skip[j - 1] + cost[i];
      }
      take = nTake;
      skip = nSkip;
    }
    let best = INF;
    for (let j = need; j <= maxP; j++) best = Math.min(best, take[j], skip[j]);
    return best;
  };
  const ans = Math.min(
    minAtLeast(1, n - 1, k),
    cost[0] + minAtLeast(2, n - 2, k - 1)
  );
  return ans >= INF / 2 ? -1 : ans;
};
