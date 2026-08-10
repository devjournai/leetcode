/**
 * Maximum Balanced Subsequence Sum
 *
 * Intuition:
 * A subsequence is balanced if:
 *
 *     nums[j] - nums[i] >= j - i
 *
 * Rearrange the equation:
 *
 *     nums[j] - j >= nums[i] - i
 *
 * This is the key observation.
 *
 * Define:
 *
 *     value[i] = nums[i] - i
 *
 * Then for two selected indices i < j, the subsequence is balanced
 * exactly when:
 *
 *     value[j] >= value[i]
 *
 * So the original problem becomes:
 *
 * Find the maximum-sum subsequence such that the transformed values
 *
 *     nums[i] - i
 *
 * are non-decreasing.
 *
 * ------------------------------------------------------------
 *
 * DP:
 *
 * Let:
 *
 *     dp[i] = maximum sum of a balanced subsequence
 *             whose last element is nums[i].
 *
 * We can start a new subsequence with nums[i]:
 *
 *     dp[i] = nums[i]
 *
 * Or append nums[i] to a previous balanced subsequence ending at
 * index j, where:
 *
 *     j < i
 *     nums[j] - j <= nums[i] - i
 *
 * Therefore:
 *
 *     dp[i] =
 *         nums[i] +
 *         max(0, max(dp[j]))
 *
 * where:
 *
 *     j < i
 *     nums[j] - j <= nums[i] - i
 *
 * The challenge is finding this maximum efficiently.
 *
 * A simple DP would take O(n²), which is too slow for n = 10^5.
 *
 * We need a data structure that supports:
 *
 *     1. Update transformed value with dp[i]
 *     2. Query maximum dp for transformed values <= current value
 *
 * A Fenwick Tree (BIT) for maximum values can handle both operations
 * in O(log n).
 *
 * ------------------------------------------------------------
 *
 * Coordinate Compression:
 *
 * The values:
 *
 *     nums[i] - i
 *
 * can be as small as -10^9 and as large as 10^9.
 *
 * We collect all transformed values and sort them.
 *
 * Example:
 *
 *     nums = [3, 3, 5, 6]
 *
 * transformed:
 *
 *     [3, 2, 3, 3]
 *
 * Sorted unique values:
 *
 *     [2, 3]
 *
 * Each transformed value receives a compressed index.
 *
 * ------------------------------------------------------------
 *
 * Fenwick Tree:
 *
 * Normally a Fenwick Tree is commonly used for sums.
 * Here, each node stores the maximum DP value.
 *
 * Update:
 *
 *     tree[index] = max(tree[index], value)
 *
 * Query:
 *
 *     maximum value from index 1 to index
 *
 * Because we process nums from left to right, every value stored
 * in the Fenwick Tree automatically comes from an earlier index.
 *
 * ------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [3, 3, 5, 6]
 *
 * Transformed values:
 *
 *     nums[i] - i
 *
 *     3 - 0 = 3
 *     3 - 1 = 2
 *     5 - 2 = 3
 *     6 - 3 = 3
 *
 * So:
 *
 *     transformed = [3, 2, 3, 3]
 *
 * Process index 0:
 *
 *     transformed = 3
 *     no previous element
 *
 *     dp[0] = 3
 *
 * Process index 1:
 *
 *     transformed = 2
 *
 * No previous transformed value <= 2.
 *
 *     dp[1] = 3
 *
 * Process index 2:
 *
 *     transformed = 3
 *
 * Previous values <= 3:
 *
 *     dp[0] = 3
 *     dp[1] = 3
 *
 * Best = 3
 *
 *     dp[2] = 5 + 3
 *           = 8
 *
 * Process index 3:
 *
 *     transformed = 3
 *
 * Best previous DP = 8
 *
 *     dp[3] = 6 + 8
 *           = 14
 *
 * Therefore:
 *
 *     Answer = 14
 *
 * The selected subsequence is:
 *
 *     [3, 5, 6]
 *
 * ------------------------------------------------------------
 *
 * Example 2:
 *
 * nums = [5, -1, -3, 8]
 *
 * transformed:
 *
 *     [5, -2, -5, 5]
 *
 * At index 3:
 *
 *     transformed = 5
 *
 * The best previous DP with transformed <= 5 is:
 *
 *     dp[0] = 5
 *
 * Therefore:
 *
 *     dp[3] = 8 + 5
 *           = 13
 *
 * The balanced subsequence is:
 *
 *     [5, 8]
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var maxBalancedSubsequenceSum = function (nums) {
  const n = nums.length;

  const transformed = new Array(n);

  for (let i = 0; i < n; i++) {
    transformed[i] = nums[i] - i;
  }

  const sorted = [...transformed].sort((a, b) => a - b);

  const unique = [];

  for (const value of sorted) {
    if (unique.length === 0 || unique[unique.length - 1] !== value) {
      unique.push(value);
    }
  }

  const rank = new Map();

  for (let i = 0; i < unique.length; i++) {
    rank.set(unique[i], i + 1);
  }

  const tree = new Array(unique.length + 1).fill(-Infinity);
  const query = (index) => {
    let maximum = -Infinity;

    while (index > 0) {
      maximum = Math.max(maximum, tree[index]);

      index -= index & -index;
    }

    return maximum;
  };

  const update = (index, value) => {
    while (index < tree.length) {
      tree[index] = Math.max(tree[index], value);

      index += index & -index;
    }
  };

  let answer = -Infinity;

  for (let i = 0; i < n; i++) {
    const currentValue = transformed[i];

    const index = rank.get(currentValue);
    const bestPrevious = query(index);
    const dp = nums[i] + Math.max(0, bestPrevious);
    update(index, dp);

    answer = Math.max(answer, dp);
  }

  return answer;
};
