/**
 * XOR After Range Multiplication Queries I
 * Intuition: Apply each query directly: multiply nums[li], nums[li+ki], ... by vi modulo 1e9+7, then XOR the whole array.
 * Approach: 1. For each (li, ri, ki, vi) loop idx from li to ri step ki and nums[idx] = nums[idx] * vi % MOD. 2. XOR all entries.
 * Dry Run: nums = [1, 2, 3], query (0, 2, 2, 4). Update indices 0,2 → [4, 2, 12]. XOR 4^2^12 = 10.
 * Time Complexity: O(q * n)
 * Space Complexity: O(1)
 */
var xorAfterQueries = function (nums, queries) {
  const MOD = 1000000007;

  for (const query of queries) {
    const li = query[0];
    const ri = query[1];
    const ki = query[2];
    const vi = query[3];
    for (let idx = li; idx <= ri; idx += ki) {
      nums[idx] = (nums[idx] * vi) % MOD;
    }
  }

  let xorSum = 0;
  for (const num of nums) {
    xorSum ^= num;
  }

  return xorSum;
};
