/**
 * Find The Sum Of The Power Of All Subsequences
 * Intuition: The power of a subsequence is 2^(number of ways it has a subsequence summing to k). Summing that over every subsequence equals the number of pairs (subsequence S, subsequence T of S) where T sums to k, which is the number of ways to color each element "in T", "in S but not T", or "in neither", with T summing to k. That yields a classic 0/1 knapsack: for each number, double every existing sum (exclude from T, whether or not it stays in S) and also add the transition that puts the number into T.
 * Approach: 1. Let `waysToReachSum[s]` be the number of assignments of processed elements that produce a chosen subset summing to `s`. 2. Start with `waysToReachSum[0] = 1`. 3. For each `num`, walk sums from `k` down to 0: if `s < num` only the "not in T" option remains (`* 2`); otherwise add the "put num in T" option from `s - num`. 4. Return `waysToReachSum[k]` modulo 1e9+7.
 * Dry Run:
 * Input: nums = [1,2,3], k = 3
 * 1. Start dp = [1,0,0,0]
 * 2. Process 1: dp = [2,1,0,0]  (empty doubled; {1} as T)
 * 3. Process 2: dp = [4,2,2,1]
 * 4. Process 3: dp = [8,4,4,6]
 * 5. Answer dp[3] = 6
 * Time Complexity: O(n * k)
 * Space Complexity: O(k)
 */
var sumOfPower = function (nums, k) {
  const MODULO = 1000000007;
  const waysToReachSum = new Array(k + 1).fill(0);
  waysToReachSum[0] = 1;

  for (let numberIndex = 0; numberIndex < nums.length; numberIndex++) {
    const currentNumber = nums[numberIndex];
    for (let currentSum = k; currentSum >= 0; currentSum--) {
      if (currentSum < currentNumber) {
        waysToReachSum[currentSum] = (waysToReachSum[currentSum] * 2) % MODULO;
      } else {
        waysToReachSum[currentSum] =
          (waysToReachSum[currentSum] * 2 +
            waysToReachSum[currentSum - currentNumber]) %
          MODULO;
      }
    }
  }

  return waysToReachSum[k];
};
