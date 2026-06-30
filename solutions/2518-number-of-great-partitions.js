/**
 * Number of Great Partitions
 *
 * Intuition:
 * Every element can be placed in either of the two groups, giving a total of
 * 2^n possible ordered partitions.
 *
 * A partition is invalid if at least one group's sum is less than k.
 *
 * Instead of counting valid partitions directly, count all invalid partitions
 * where one group has sum < k. Since the total array sum is checked first,
 * both groups cannot simultaneously have sum < k, so every invalid partition
 * is counted exactly twice (once for each group).
 *
 * Therefore:
 *
 *      Great Partitions =
 *          Total Partitions
 *          - 2 × (Subsets with sum < k)
 *
 * Approach:
 * 1. Compute the total sum of the array.
 * 2. If totalSum < 2 × k,
 *      return 0 because both groups cannot have sum at least k.
 * 3. Compute:
 *      totalPartitions = 2^n mod MOD.
 * 4. Use 1D Dynamic Programming to count subsets having sum < k.
 *
 *      dp[s] = number of subsets whose sum equals s.
 *
 *      Initialize:
 *          dp[0] = 1
 *
 *      For every number:
 *          update dp from right to left.
 *
 * 5. Sum every dp[s] where s < k.
 *      This equals the number of invalid subsets.
 *
 * 6. Answer:
 *
 *      totalPartitions
 *      - 2 × invalidSubsets
 *
 *      (take modulo properly)
 *
 * 7. Return the result.
 *
 * Dry Run:
 *
 * Input:
 * nums = [1,2,3,4]
 * k = 4
 *
 * Total Sum = 10
 *
 * Since
 * 10 >= 8
 * Continue.
 *
 * Total Partitions
 *
 * = 2^4
 * = 16
 *
 * DP computes subsets with sum < 4.
 *
 * Possible sums:
 *
 * {}
 * sum=0
 *
 * {1}
 * sum=1
 *
 * {2}
 * sum=2
 *
 * {3}
 * sum=3
 *
 * {1,2}
 * sum=3
 *
 * Total invalid subsets = 5
 *
 * Invalid ordered partitions
 * = 2 × 5
 * = 10
 *
 * Great Partitions
 *
 * = 16 − 10
 * = 6
 *
 * Return 6.
 *
 * Time Complexity: O(N × K)
 * Space Complexity: O(K)
 */
var countPartitions = function (nums, k) {
  const MOD = 1000000007n;

  let totalSum = 0;
  for (const num of nums) {
    totalSum += num;
  }

  if (totalSum < 2 * k) {
    return 0;
  }

  let totalPartitions = 1n;
  for (let i = 0; i < nums.length; i++) {
    totalPartitions = (totalPartitions * 2n) % MOD;
  }

  const dp = Array(k).fill(0n);
  dp[0] = 1n;

  for (const num of nums) {
    for (let sum = k - 1; sum >= num; sum--) {
      dp[sum] = (dp[sum] + dp[sum - num]) % MOD;
    }
  }

  let invalidSubsets = 0n;

  for (let sum = 0; sum < k; sum++) {
    invalidSubsets = (invalidSubsets + dp[sum]) % MOD;
  }

  let answer = (totalPartitions - 2n * invalidSubsets) % MOD;

  if (answer < 0) {
    answer += MOD;
  }

  return Number(answer);
};
