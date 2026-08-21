/**
 * Divisible Game
 * Intuition: Score difference for k,l,r is 2*sum of multiples of k in [l,r] - sum[l,r]. Maximize that, then min k>1, return product mod.
 * Approach: Difference = sum_i in [l,r] (nums[i] if k|nums[i] else -nums[i]) = 2*S_k - S_range. Max over ranges of 2*S_k - S is max subarray of transformed array a_i = 2*nums[i]*(k|nums[i]) - nums[i].
 * Dry Run: Input: nums=[1,4,6,8]. Output: 36.
 * Time Complexity: O(N * tau(A))
 * Space Complexity: O(N)
 */
var divisibleGame = function (nums) {
  const MOD = 1000000007n;
  const n = nums.length;
  const maxA = Math.max(...nums);
  let bestDiff = -1e18,
    bestK = 2;
  const kadane = (arr) => {
    let cur = arr[0],
      mx = arr[0];
    for (let i = 1; i < arr.length; i++) {
      cur = Math.max(arr[i], cur + arr[i]);
      mx = Math.max(mx, cur);
    }
    return mx;
  };
  for (let k = 2; k <= maxA + 1; k++) {
    const arr = nums.map((x) => (x % k === 0 ? x : -x));
    const d = kadane(arr);
    if (d > bestDiff || (d === bestDiff && k < bestK)) {
      bestDiff = d;
      bestK = k;
    }
  }
  let prod = (BigInt(bestDiff) * BigInt(bestK)) % MOD;
  if (prod < 0n) prod += MOD;
  return Number(prod);
};
