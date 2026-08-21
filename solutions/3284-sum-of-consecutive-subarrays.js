/**
 * Sum of Consecutive Subarrays
 * Intuition: A subarray is consecutive if adjacent values differ by +1 or by -1 throughout. Every singleton is consecutive, so it would be counted in both the strictly-increasing-by-1 family and the strictly-decreasing-by-1 family. Sum each family in linear time, then subtract the array sum once so singletons are not double-counted.
 * Approach:
 * 1. Let MOD = 1e9+7.
 * 2. `sumWithDiff(diff)` walks the array once. While `nums[i] === nums[i-1] + diff`, the new value belongs to `count` consecutive subarrays ending at i; add `count * nums[i]` to the running sum of all such subarray totals ending here.
 * 3. When the chain breaks, reset `count = 1` and `summ = nums[i]`.
 * 4. Answer is `sumWithDiff(1) + sumWithDiff(-1) - sum(nums)` modulo MOD (add MOD if negative).
 * Dry Run: nums = [1, 2, 3]
 *   - diff = +1: endings [1]; [1,2] and [2]; [1,2,3],[2,3],[3]. Totals 1 + (3+2) + (6+5+3) = 20
 *   - diff = -1: only singletons 1+2+3 = 6
 *   - Subtract array sum 6: 20 + 6 - 6 = 20
 *   - Consecutive subarrays: [1],[2],[3],[1,2],[2,3],[1,2,3] sums 1+2+3+3+5+6 = 20
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var getSum = function (nums) {
  const MOD = 1000000007;

  const sumWithDiff = (diff) => {
    let res = nums[0];
    let summ = nums[0];
    let count = 1;

    for (let i = 1; i < nums.length; i++) {
      if (nums[i] === nums[i - 1] + diff) {
        count += 1;
        summ = (summ + count * nums[i]) % MOD;
      } else {
        count = 1;
        summ = nums[i];
      }
      res = (res + summ) % MOD;
    }

    return res;
  };

  let arraySum = 0;
  for (const num of nums) arraySum = (arraySum + num) % MOD;

  return (((sumWithDiff(1) + sumWithDiff(-1) - arraySum) % MOD) + MOD) % MOD;
};
