/**
 * Length of the Longest Subsequence That Sums to Target
 *
 * Intuition:
 * We need to find the longest subsequence whose elements add up exactly
 * to `target`.
 *
 * Since every number is positive, we can use Dynamic Programming.
 *
 * Let `dp[sum]` represent the maximum length of a subsequence whose
 * total sum is exactly `sum`.
 *
 * Initially:
 * - `dp[0] = 0` because an empty subsequence has sum 0.
 * - Every other state is impossible, so we initialize it with -1.
 *
 * For every number `num`:
 * - We can either skip it.
 * - Or include it in a subsequence whose previous sum is `sum - num`.
 *
 * If `dp[sum - num]` is valid, then:
 *
 *     dp[sum] = max(dp[sum], dp[sum - num] + 1)
 *
 * We iterate `sum` from `target` down to `num`.
 * Going backwards is important because it prevents using the same
 * element more than once.
 *
 * Approach:
 * 1. Create a DP array of size `target + 1`.
 * 2. Fill it with `-1` to represent unreachable sums.
 * 3. Set `dp[0] = 0`.
 * 4. Iterate through every number in `nums`.
 * 5. For each number, iterate from `target` down to that number.
 * 6. If `dp[sum - num]` is reachable, update `dp[sum]`.
 * 7. Return `dp[target]`.
 *
 * Dry Run:
 * nums = [1, 2, 3, 4, 5]
 * target = 9
 *
 * Initial DP:
 *
 * dp = [0, -1, -1, -1, -1, -1, -1, -1, -1, -1]
 *
 * Process num = 1:
 * dp[1] = dp[0] + 1 = 1
 *
 * Process num = 2:
 * dp[3] = dp[1] + 1 = 2
 * dp[2] = dp[0] + 1 = 1
 *
 * Process num = 3:
 * dp[6] = dp[3] + 1 = 3
 * dp[5] = dp[2] + 1 = 2
 * dp[4] = dp[1] + 1 = 2
 * dp[3] = max(dp[3], dp[0] + 1) = 2
 *
 * Process num = 4:
 * dp[9] = dp[5] + 1 = 3
 *
 * Therefore, we can form sum 9 using 3 elements.
 *
 * One possible subsequence is:
 *
 * [1, 3, 5] → 1 + 3 + 5 = 9
 *
 * Hence, the answer is 3.
 *
 * Time Complexity: O(n * target)
 * Space Complexity: O(target)
 */
var lengthOfLongestSubsequence = function (nums, target) {
  let dp = new Array(target + 1).fill(-1);

  dp[0] = 0;

  for (let num of nums) {
    for (let sum = target; sum >= num; sum--) {
      if (dp[sum - num] !== -1) {
        dp[sum] = Math.max(dp[sum], dp[sum - num] + 1);
      }
    }
  }

  return dp[target];
};
