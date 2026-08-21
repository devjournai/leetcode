/**
 * Minimum Partition Score
 * Intuition: Translate the problem into a direct scan or DP over the constraints, using the official examples as the correctness check.
 * Approach: 1. Parse the inputs. 2. Apply the core algorithm described in Intuition. 3. Return the required value.
 * Dry Run: Input: nums = [5,1,2,1], k = 2 => Output: 25
 * Time Complexity: O(K N log N)
 * Space Complexity: O(N)
 */
var minimumScore = function (nums, k) {
  const n = nums.length;
  const p = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) p[i + 1] = p[i] + nums[i];
  const cost = (l, r) => {
    const s = p[r + 1] - p[l];
    return (s * (s + 1)) / 2;
  };
  let dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= n; i++) dp[i] = cost(0, i - 1);
  for (let t = 2; t <= k; t++) {
    const ndp = new Array(n + 1).fill(Infinity);
    const solve = (il, ir, jl, jr) => {
      if (il > ir) return;
      const im = (il + ir) >> 1;
      let best = Infinity;
      let bestJ = jl;
      const jMax = Math.min(jr, im - 1);
      for (let j = jl; j <= jMax; j++) {
        if (dp[j] === Infinity) continue;
        const val = dp[j] + cost(j, im - 1);
        if (val < best) {
          best = val;
          bestJ = j;
        }
      }
      ndp[im] = best;
      solve(il, im - 1, jl, bestJ);
      solve(im + 1, ir, bestJ, jr);
    };
    solve(t, n, t - 1, n - 1);
    dp = ndp;
  }
  return dp[n];
};
