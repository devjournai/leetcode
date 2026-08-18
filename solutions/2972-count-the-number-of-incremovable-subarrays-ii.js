/**
 * Count the Number of Incremovable Subarrays II
 *
 * Intuition:
 *
 * We remove one contiguous subarray:
 *
 *     nums[l ... r]
 *
 * After removing it, the remaining array is:
 *
 *     nums[0 ... l - 1] + nums[r + 1 ... n - 1]
 *
 * For the result to be strictly increasing, three conditions
 * must hold:
 *
 * 1. The left part must already be strictly increasing.
 *
 * 2. The right part must already be strictly increasing.
 *
 * 3. If both parts exist:
 *
 *        nums[l - 1] < nums[r + 1]
 *
 * ------------------------------------------------------------
 *
 * Step 1:
 *
 * Find the longest strictly increasing prefix.
 *
 * Example:
 *
 *     nums = [1,2,3,6,5,7]
 *
 * The increasing prefix is:
 *
 *     [1,2,3,6]
 *
 * ------------------------------------------------------------
 *
 * Step 2:
 *
 * Find the longest strictly increasing suffix.
 *
 * For the same example:
 *
 *     [5,7]
 *
 * is the increasing suffix.
 *
 * ------------------------------------------------------------
 *
 * We can choose the removed subarray so that:
 *
 *     left part = nums[0 ... i]
 *
 *     right part = nums[j ... n-1]
 *
 * where:
 *
 *     i < j - 1
 *
 * The removed subarray is:
 *
 *     nums[i + 1 ... j - 1]
 *
 * ------------------------------------------------------------
 *
 * First handle removing everything from some position to the
 * end.
 *
 * If nums[0 ... i] is strictly increasing, we can remove:
 *
 *     nums[i + 1 ... n - 1]
 *
 * Therefore, every position in the increasing prefix contributes
 * one valid answer.
 *
 * ------------------------------------------------------------
 *
 * Then handle keeping a suffix.
 *
 * We scan possible left boundaries from the increasing prefix
 * and use a pointer to find the first valid suffix position.
 *
 * Because the suffix is strictly increasing, once:
 *
 *     nums[i] < nums[j]
 *
 * becomes true, every position after j also works.
 *
 * This gives an O(n) two-pointer solution.
 *
 * ------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [6,5,7,8]
 *
 * Increasing prefix:
 *
 *     [6]
 *
 * Increasing suffix:
 *
 *     [5,7,8]
 *
 * Valid removals include:
 *
 *     [5]
 *     [6,5]
 *     [5,7]
 *     [5,7,8]
 *     [6,5,7]
 *     [6,5,7,8]
 *     [6]
 *
 * Total:
 *
 *     7
 *
 * ------------------------------------------------------------
 *
 * Important:
 *
 * The empty resulting array is considered strictly increasing.
 *
 * Therefore, removing the entire array is always valid.
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var incremovableSubarrayCount = function (nums) {
  const n = nums.length;

  let left = 0;

  while (left + 1 < n && nums[left] < nums[left + 1]) {
    left++;
  }

  if (left === n - 1) {
    return (n * (n + 1)) / 2;
  }

  let right = n - 1;

  while (right > 0 && nums[right - 1] < nums[right]) {
    right--;
  }

  let answer = left + 2;
  let j = right;
  for (let i = 0; i <= left; i++) {
    while (j < n && nums[j] <= nums[i]) {
      j++;
    }
    answer += n - j;
  }

  return answer;
};
