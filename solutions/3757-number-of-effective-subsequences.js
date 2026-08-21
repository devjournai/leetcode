/**
 * Number of Effective Subsequences
 * Intuition: Removing a subsequence is effective iff the OR of the leftover numbers drops below the OR of the whole array, i.e. the leftovers miss at least one bit of the global OR.
 * Approach: 1. Collect bits present in the total OR and map each value onto that bit set. 2. SOS-DP counts how many numbers lie in each bit-subset. 3. Inclusion-exclusion over nonempty missed-bit masks adds/subtracts 2^(count of numbers avoiding those bits).
 * Dry Run: nums = [1,2,3], total OR = 3. Only subsets that strip bit 0 or bit 1 from the remainder are counted, giving 3.
 * Time Complexity: O((N + R) log R)
 * Space Complexity: O(N + R)
 */
var countEffective = function (nums) {
  const MOD = 1e9 + 7;
  let total = 0;
  for (const x of nums) {
    total |= x;
  }
  const bits = [];
  for (let i = 0; i < 32; i++) {
    if (total & (1 << i)) {
      bits.push(i);
    }
  }
  const m = bits.length;
  const dp = Array(1 << m).fill(0);
  for (const x of nums) {
    let mask = 0;
    for (let i = 0; i < m; i++) {
      if (x & (1 << bits[i])) {
        mask |= 1 << i;
      }
    }
    dp[mask]++;
  }
  for (let i = 0; i < m; i++) {
    for (let mask = 0; mask < dp.length; mask++) {
      if (mask & (1 << i)) {
        dp[mask] += dp[mask ^ (1 << i)];
      }
    }
  }
  const cnt = Array(1 << m).fill(0);
  for (let mask = 1; mask < cnt.length; mask++) {
    cnt[mask] = cnt[mask & (mask - 1)] + 1;
  }
  const pow2 = Array(nums.length + 1).fill(1);
  for (let i = 0; i < nums.length; i++) {
    pow2[i + 1] = (pow2[i] * 2) % MOD;
  }
  let result = 0;
  const full = (1 << m) - 1;
  for (let mask = 1; mask < cnt.length; mask++) {
    const sign = cnt[mask] & 1 ? 1 : -1;
    result = (result + sign * pow2[dp[full ^ mask]]) % MOD;
    if (result < 0) {
      result += MOD;
    }
  }
  return result;
};
