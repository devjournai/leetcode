/**
 * Minimum Total Cost to Process All Elements
 * Intuition: The i-th operation costs i, so if we perform cnt operations in total, the total cost is 1 + 2 + cdots + cnt = dfrac{cnt(cnt+1)}{2}. Minimizing the total cost is equivalent to minimizing the number of operations.
 * Approach: The i-th operation costs i, so if we perform cnt operations in total, the total cost is 1 + 2 + cdots + cnt = dfrac{cnt(cnt+1)}{2}. Minimizing the total cost is equivalent to minimizing the number of operations. Simulate the process from left to right. Maintain the current available resources cur (initially k) and the number of operations performed cnt. When processing an element x: - If cur ge x, simply subtract x; - Otherwise, perform m = leftlceildfrac{x - cur}{k}rightrceil more operations to increase resources by m  *  k, then subtract x.
 * Dry Run: Input: nums = [1,2,3,4], k = 4. Output: 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minimumCost = function (nums, k) {
  const MOD = 1000000007n;
  let cnt = 0n;
  let cur = BigInt(k);
  const K = BigInt(k);

  for (const x of nums) {
    const diff = BigInt(x) - cur;
    if (diff > 0n) {
      const m = (diff + K - 1n) / K;
      cur += m * K;
      cnt += m;
    }
    cur -= BigInt(x);
  }

  cnt %= MOD;
  return Number((((cnt + 1n) * cnt) / 2n) % MOD);
};
