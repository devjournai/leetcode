/**
 * Minimum Increment Operations to Make Array Beautiful
 *
 * Intuition:
 * An array is beautiful if every subarray of length 3 or more
 * has at least one element >= k.
 *
 * This condition is equivalent to:
 *
 *     There cannot be 3 consecutive elements whose values are < k.
 *
 * Why?
 *
 * If there are 3 consecutive elements:
 *
 *     nums[i], nums[i + 1], nums[i + 2] < k
 *
 * then the subarray of length 3 has a maximum < k,
 * so the array is not beautiful.
 *
 * On the other hand, if every group of 3 consecutive elements
 * contains an element >= k, then every longer subarray also
 * contains such an element.
 *
 * Therefore, our goal is:
 *
 *     Make sure there are never 3 consecutive elements < k.
 *
 * For an element nums[i] < k, we have two choices:
 *
 * 1. Leave it unchanged.
 *    Cost = 0
 *
 * 2. Increment it until it becomes k.
 *    Cost = k - nums[i]
 *
 * If nums[i] >= k, it already satisfies the requirement.
 * It costs 0 and effectively breaks the consecutive sequence
 * of elements below k.
 *
 * ------------------------------------------------------------
 *
 * DP State:
 *
 * We only need to know how many consecutive elements before the
 * current position are still < k.
 *
 * Let:
 *
 *     dp[0] = minimum cost when the current suffix has 0
 *             consecutive elements < k
 *
 *     dp[1] = minimum cost when the current suffix has 1
 *             consecutive element < k
 *
 *     dp[2] = minimum cost when the current suffix has 2
 *             consecutive elements < k
 *
 * We never allow a state representing 3 consecutive elements < k.
 *
 * ------------------------------------------------------------
 *
 * For nums[i] >= k:
 *
 * The current element already satisfies the condition.
 *
 * Therefore, the consecutive count becomes 0:
 *
 *     newDp[0] = min(dp[0], dp[1], dp[2])
 *
 *     newDp[1] = INF
 *     newDp[2] = INF
 *
 * However, we can simplify the implementation further by using
 * a different DP representation.
 *
 * ------------------------------------------------------------
 *
 * Alternative DP:
 *
 * Let dp[j] represent the minimum cost after processing the array
 * where the last `j` elements are below k.
 *
 * For each nums[i] < k:
 *
 * 1. Increment nums[i] to k:
 *
 *       cost = k - nums[i]
 *
 *       The consecutive count becomes 0.
 *
 * 2. Do not increment:
 *
 *       cost = 0
 *
 *       The consecutive count increases by 1.
 *
 * We cannot allow the count to become 3.
 *
 * ------------------------------------------------------------
 *
 * A compact 3-state implementation:
 *
 *     dp0 = minimum cost with 0 consecutive low elements
 *     dp1 = minimum cost with 1 consecutive low element
 *     dp2 = minimum cost with 2 consecutive low elements
 *
 * For nums[i] < k:
 *
 *     newDp0 = min(dp0, dp1, dp2) + (k - nums[i])
 *
 *     newDp1 = dp0
 *
 *     newDp2 = dp1
 *
 * For nums[i] >= k:
 *
 *     newDp0 = min(dp0, dp1, dp2)
 *     newDp1 = INF
 *     newDp2 = INF
 *
 * ------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [2, 3, 0, 0, 2]
 * k = 4
 *
 * Costs to increment:
 *
 *     2 -> 4 : cost 2
 *     3 -> 4 : cost 1
 *     0 -> 4 : cost 4
 *     0 -> 4 : cost 4
 *     2 -> 4 : cost 2
 *
 * Start:
 *
 *     dp0 = 0
 *     dp1 = INF
 *     dp2 = INF
 *
 * Process 2:
 *
 * We can increment it:
 *
 *     cost = 2
 *
 * Or leave it:
 *
 *     consecutive low = 1
 *
 * States:
 *
 *     dp0 = 2
 *     dp1 = 0
 *     dp2 = INF
 *
 * Process 3:
 *
 * Increment:
 *
 *     min(dp0, dp1, dp2) + 1
 *     = 0 + 1
 *     = 1
 *
 * Leave unchanged:
 *
 *     dp2 = dp0 = 2
 *
 * States:
 *
 *     dp0 = 1
 *     dp1 = 2
 *     dp2 = 2
 *
 * Process 0:
 *
 * We can increment it:
 *
 *     dp0 = min(1, 2, 2) + 4
 *         = 5
 *
 * Or leave it:
 *
 *     dp1 = 1
 *     dp2 = 2
 *
 * States:
 *
 *     dp0 = 5
 *     dp1 = 1
 *     dp2 = 2
 *
 * Process 0:
 *
 * Increment:
 *
 *     dp0 = min(5, 1, 2) + 4
 *         = 5
 *
 * Leave:
 *
 *     dp1 = 1
 *     dp2 = 1
 *
 * States:
 *
 *     dp0 = 5
 *     dp1 = 1
 *     dp2 = 1
 *
 * Process 2:
 *
 * Increment:
 *
 *     dp0 = min(5, 1, 1) + 2
 *         = 3
 *
 * Leave:
 *
 *     dp1 = 1
 *     dp2 = 1
 *
 * Final answer:
 *
 *     min(3, 1, 1) = 1
 *
 * But this indicates the state definition above would allow a
 * final sequence with insufficient coverage if interpreted as
 * "all low elements must be separated" without considering that
 * an incremented element itself breaks the run. The correct
 * recurrence must instead track the number of consecutive
 * unmodified low elements and enforce that every window of 3
 * contains a modified/high element.
 *
 * The cleanest formulation is therefore to track the last
 * selected (made >= k) position.
 *
 * ------------------------------------------------------------
 *
 * Correct DP Formulation:
 *
 * For each position i, if nums[i] < k, we may choose it as a
 * "good" element by paying k - nums[i].
 *
 * We need every group of 3 consecutive positions to contain
 * at least one good element.
 *
 * Therefore, selected positions cannot have a gap of more than 3.
 *
 * Let:
 *
 *     dp[i] = minimum cost when position i is selected
 *             (made >= k).
 *
 * If the previous selected position is:
 *
 *     i - 1, i - 2, or i - 3
 *
 * then there are at most 2 unselected positions between them.
 *
 * So:
 *
 *     dp[i] = cost(i) + min(
 *                  dp[i - 1],
 *                  dp[i - 2],
 *                  dp[i - 3]
 *              )
 *
 * We also need to handle the beginning of the array.
 *
 * A simpler and more robust implementation is to use
 * three states representing how many positions have passed
 * since the last element >= k.
 *
 * ------------------------------------------------------------
 *
 * Implementation:
 *
 * `dp[0]`, `dp[1]`, `dp[2]` represent:
 *
 *     0 = last position is >= k
 *     1 = one low element after the last >= k
 *     2 = two low elements after the last >= k
 *
 * If we encounter a low element:
 *
 * - Increment it to k:
 *
 *       new state = 0
 *       cost += k - nums[i]
 *
 * - Leave it:
 *
 *       state increases by 1
 *
 * We cannot transition from state 2 to another low element.
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minIncrementOperations = function (nums, k) {
  const INF = Number.MAX_SAFE_INTEGER;

  let dp0 = 0;
  let dp1 = INF;
  let dp2 = INF;

  for (let num of nums) {
    if (num >= k) {
      const best = Math.min(dp0, dp1, dp2);

      dp0 = best;
      dp1 = INF;
      dp2 = INF;
    } else {
      const makeGood = Math.min(dp0, dp1, dp2) + (k - num);
      const leaveLow1 = dp0;
      const leaveLow2 = dp1;

      dp0 = makeGood;
      dp1 = leaveLow1;
      dp2 = leaveLow2;
    }
  }

  return Math.min(dp0, dp1, dp2);
};
