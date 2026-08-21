/**
 * Sum of Good Subsequences
 * Intuition: A subsequence is good if adjacent values differ by at most 1. When `num` arrives, every good subsequence that already ends in `num - 1`, `num`, or `num + 1` can be extended by `num`, and `[num]` itself is always good.
 * Approach: 1. Let `endsIn[v + 1]` be the count of good subsequences ending with value `v`, and `dp[v + 1]` their total sum (offset by 1 so `v = 0` is valid). 2. For each `num`, `seqsToAppend = 1 + endsIn[num] + endsIn[num + 2]` (singleton plus ends at `num-1` and `num+1`). 3. New sum for endings at `num` is `seqsToAppend * num +` old sums of those groups. 4. Accumulate counts and sums modulo `10^9+7`. 5. Return the sum of all `dp` entries.
 * Dry Run: nums = [1, 2, 1]
 *   - 1: seqs=1, dp[2]=1, endsIn[2]=1. Total 1
 *   - 2: seqs=1+endsIn[2]+endsIn[4]=2, dp[3]=2*2+dp[2]=5, endsIn[3]=2. Total 1+5=6
 *   - 1: seqs=1+endsIn[1]+endsIn[3]=3, dp[2]=3*1+1+5=9, endsIn[2]=4. Total 9+5=14
 * Time Complexity: O(N + M) where M = max(nums)
 * Space Complexity: O(M)
 */
var sumOfGoodSubsequences = function (nums) {
  const MOD = 1000000007;
  let maxNum = 0;
  for (const num of nums) {
    maxNum = Math.max(maxNum, num);
  }

  const endsIn = new Array(maxNum + 3).fill(0);
  const dp = new Array(maxNum + 3).fill(0);

  for (const num of nums) {
    const seqsToAppend = (1 + endsIn[num] + endsIn[num + 2]) % MOD;
    dp[num + 1] =
      (seqsToAppend * num + (dp[num + 1] + dp[num] + dp[num + 2])) % MOD;
    endsIn[num + 1] = (endsIn[num + 1] + seqsToAppend) % MOD;
  }

  let totalSum = 0;
  for (const endingSum of dp) {
    totalSum = (totalSum + endingSum) % MOD;
  }
  return totalSum;
};
