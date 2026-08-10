/**
 * 2945. Find Maximum Non-decreasing Array Length
 *
 * Intuition:
 *
 * Every operation combines a contiguous group of numbers into
 * their sum.
 *
 * Therefore, the final array can be viewed as partitioning the
 * original array into contiguous groups.
 *
 * Example:
 *
 *     nums = [4, 3, 2, 6]
 *
 * We can partition it as:
 *
 *     [4] [3,2] [6]
 *
 * Their sums are:
 *
 *     4, 5, 6
 *
 * which is non-decreasing.
 *
 * So the problem becomes:
 *
 *     Divide nums into the maximum number of contiguous groups
 *     such that their sums are non-decreasing.
 *
 * ------------------------------------------------------------
 *
 * Prefix Sum:
 *
 * Let:
 *
 *     prefix[i] = sum of nums[0 ... i - 1]
 *
 * Then the sum of a group [l ... r] is:
 *
 *     prefix[r + 1] - prefix[l]
 *
 * Suppose the previous group ends at index p - 1 and the
 * current group ends at index i.
 *
 * Previous group sum:
 *
 *     prefix[p] - prefix[start]
 *
 * Current group sum:
 *
 *     prefix[i + 1] - prefix[p]
 *
 * We need:
 *
 *     currentSum >= previousSum
 *
 * ------------------------------------------------------------
 *
 * DP:
 *
 * We can think of dp[i] as the maximum number of groups that
 * can be created using the first i elements.
 *
 * The challenge is finding the earliest possible position from
 * which the next group can start.
 *
 * Because nums[i] > 0, prefix sums are strictly increasing.
 *
 * This allows us to use binary search.
 *
 * ------------------------------------------------------------
 *
 * Optimized Idea:
 *
 * For every possible number of groups, we maintain the minimum
 * possible ending prefix sum.
 *
 * The important property is that once a group has been created,
 * its sum must be at least the sum of the previous group.
 *
 * Using prefix sums, we can find the earliest valid boundary
 * with binary search.
 *
 * ------------------------------------------------------------
 *
 * Another useful interpretation:
 *
 * Suppose the previous group starts at `start` and ends before
 * `i`.
 *
 * Its sum is:
 *
 *     prefix[i] - prefix[start]
 *
 * For the next group starting at i, we need:
 *
 *     prefix[j] - prefix[i] >= prefix[i] - prefix[start]
 *
 * Rearranging:
 *
 *     prefix[j] >= 2 * prefix[i] - prefix[start]
 *
 * Since prefix is strictly increasing, we can binary search for
 * the first j satisfying this condition.
 *
 * This lets us greedily construct the next group as early as
 * possible, which leaves maximum room for future groups.
 *
 * ------------------------------------------------------------
 *
 * We maintain:
 *
 *     dp[i] = maximum number of groups whose final boundary is i
 *
 * and:
 *
 *     last[i] = minimum possible sum of the last group for that
 *               number of groups.
 *
 * The optimized implementation below uses a monotonic structure
 * to avoid repeatedly scanning all previous boundaries.
 *
 * ------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [4,3,2,6]
 *
 * Possible partition:
 *
 *     [4] [3,2] [6]
 *
 * Sums:
 *
 *     4 <= 5 <= 6
 *
 * Therefore:
 *
 *     answer = 3
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var maxNonDecreasingLength = function (nums) {
  const n = nums.length;
  const prefix = new Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }

  const dp = new Array(n + 1).fill(0);
  const best = new Array(n + 1).fill(Infinity);
  dp[0] = 0;
  best[0] = 0;

  for (let i = 1; i <= n; i++) {
    let low = 0;
    let high = i - 1;
    let previous = 0;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      if (best[mid] <= prefix[i] - prefix[mid]) {
        previous = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    if (previous !== 0 || best[0] <= prefix[i]) {
      dp[i] = dp[previous] + 1;
      best[i] = prefix[i] - prefix[previous];
    }
  }

  return dp[n];
};
