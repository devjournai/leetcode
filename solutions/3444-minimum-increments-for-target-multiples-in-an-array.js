/**
 * Minimum Increments for Target Multiples in an Array
 * Intuition: Each nums[i] can be increased to cover a subset of targets whose LCM is reached with (lcm - num % lcm) increments. DP over the bitmask of covered targets.
 * Approach: 1. For every nonempty target subset, store its LCM. 2. dp[mask] = min increments to cover that subset. 3. For each num, try OR-ing every subset mask at the cost to reach that LCM.
 * Dry Run: nums = [1,2,3], target = [4]. LCM 4, cost from 1 is 3, from 2 is 2, from 3 is 1. dp ends at 1.
 * Time Complexity: O(2^T * N)
 * Space Complexity: O(2^T)
 */

var minimumIncrements = function (nums, target) {
  const gcd = (a, b) => (b === 0n ? a : gcd(b, a % b));
  const lcm = (a, b) => (a / gcd(a, b)) * b;

  const maxMask = 1 << target.length;
  const maskToLcm = new Map();
  for (let mask = 1; mask < maxMask; mask++) {
    let subsetLcm = 1n;
    for (let bit = 0; bit < target.length; bit++) {
      if ((mask >> bit) & 1) {
        subsetLcm = lcm(subsetLcm, BigInt(target[bit]));
      }
    }
    maskToLcm.set(mask, subsetLcm);
  }

  const INF = Number.MAX_SAFE_INTEGER;
  let dp = new Array(maxMask).fill(INF);
  dp[0] = 0;

  for (const num of nums) {
    const maskToCost = [];
    for (const [mask, subsetLcm] of maskToLcm) {
      const remainder = BigInt(num) % subsetLcm;
      const cost = remainder === 0n ? 0 : Number(subsetLcm - remainder);
      maskToCost.push([mask, cost]);
    }
    const nextDp = dp.slice();
    for (let prevMask = 0; prevMask < maxMask; prevMask++) {
      if (dp[prevMask] === INF) {
        continue;
      }
      for (const [mask, cost] of maskToCost) {
        const newMask = prevMask | mask;
        nextDp[newMask] = Math.min(nextDp[newMask], dp[prevMask] + cost);
      }
    }
    dp = nextDp;
  }

  return dp[maxMask - 1] === INF ? -1 : dp[maxMask - 1];
};
