/**
 * Find Minimum Cost to Remove Array Elements
 * Intuition: Each operation removes two of the first three remaining elements and pays the max of those two. The leftover element stays at the front. DP on `(leftoverIndex, nextIndex)` — the leftover plus the suffix starting at `nextIndex`.
 * Approach: 1. State `(last, i)`: leftover is `nums[last]`, unprocessed starts at `i`. 2. One element left → pay it. Two left → pay max. 3. Otherwise try removing `(i, i+1)` keep `last`, or `(last, i)` keep `i+1`, or `(last, i+1)` keep `i`, each costing the pair max. 4. Memoize.
 * Dry Run: nums = [6,2,8,4]. First triple 6,2,8: remove 6&8 (cost 8) leftover 2 then 4 → pay 4, total 12; other pair choices yield the minimum among the three branches.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var minCost = function (nums) {
  const n = nums.length;
  const memo = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(-1));

  function dp(lastIndex, nextIndex) {
    if (nextIndex === n) {
      return nums[lastIndex];
    }
    if (nextIndex === n - 1) {
      return Math.max(nums[lastIndex], nums[nextIndex]);
    }
    if (memo[nextIndex][lastIndex] !== -1) {
      return memo[nextIndex][lastIndex];
    }

    const removeNextPair =
      Math.max(nums[nextIndex], nums[nextIndex + 1]) +
      dp(lastIndex, nextIndex + 2);
    const removeLastAndNext =
      Math.max(nums[lastIndex], nums[nextIndex]) +
      dp(nextIndex + 1, nextIndex + 2);
    const removeLastAndAfter =
      Math.max(nums[lastIndex], nums[nextIndex + 1]) +
      dp(nextIndex, nextIndex + 2);

    memo[nextIndex][lastIndex] = Math.min(
      removeNextPair,
      removeLastAndNext,
      removeLastAndAfter
    );
    return memo[nextIndex][lastIndex];
  }

  return dp(0, 1);
};
