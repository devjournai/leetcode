/**
 * Minimum Cost to Equalize Array
 * Intuition: Raise every value to some target >= max(nums). Operation 1 increments one index; operation 2 increments two. If two single increments are cheaper than a pair, never use operation 2. Otherwise pair as many increments as possible without pairing two of the largest remaining gap.
 * Approach: 1. If n < 3 or 2 * cost1 <= cost2, pay cost1 for every unit up to max(nums). 2. Otherwise try each target from max(nums) to 2 * max(nums) - 1. 3. For a target, totalGap is the sum of needed increments and maxGap is target - min(nums). 4. Pair min(totalGap / 2, totalGap - maxGap) times, then pay cost1 for leftovers. 5. Return the minimum cost modulo 1e9+7.
 * Dry Run: nums = [1, 14, 14, 15], cost1 = 2, cost2 = 1
 * - Pairing is cheaper. Trying targets starting at 15 yields a minimum cost of 20.
 * Time Complexity: O(max(nums))
 * Space Complexity: O(1)
 */
var minCostToEqualizeArray = function (nums, cost1, cost2) {
  const MOD = 1000000007n;
  const n = nums.length;
  let minNum = nums[0];
  let maxNum = nums[0];
  let sum = 0n;
  for (const num of nums) {
    minNum = Math.min(minNum, num);
    maxNum = Math.max(maxNum, num);
    sum += BigInt(num);
  }

  if (cost1 * 2 <= cost2 || n < 3) {
    const totalGap = BigInt(maxNum) * BigInt(n) - sum;
    return Number((BigInt(cost1) * totalGap) % MOD);
  }

  let answer = null;
  for (let target = maxNum; target < 2 * maxNum; target++) {
    const maxGap = BigInt(target - minNum);
    const totalGap = BigInt(target) * BigInt(n) - sum;
    const pairs =
      totalGap / 2n < totalGap - maxGap ? totalGap / 2n : totalGap - maxGap;
    const cost =
      BigInt(cost1) * (totalGap - 2n * pairs) + BigInt(cost2) * pairs;
    if (answer === null || cost < answer) {
      answer = cost;
    }
  }

  return Number(answer % MOD);
};
