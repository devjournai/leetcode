/**
 * Find the Longest Equal Subarray
 *
 * Intuition:
 * We want the longest subarray that can become entirely one value after
 * deleting at most k elements.
 *
 * Instead of considering every subarray, process each distinct value
 * separately.
 *
 * For every value, store all of its indices.
 *
 * Example:
 *
 *      nums = [1,3,2,3,1,3]
 *
 *      value = 3
 *
 *      indices = [1,3,5]
 *
 * Suppose our current window contains:
 *
 *      indices[left ... right]
 *
 * These are occurrences of the same value that we want to keep.
 *
 * Between consecutive occurrences are other numbers that must be deleted.
 *
 * The number of deletions required is:
 *
 *      (indices[right] - indices[left])
 *      - (right - left)
 *
 * because:
 *
 *      total positions in the interval
 *      −
 *      occurrences of the chosen value
 *
 * If this exceeds k, we shrink the window.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Group indices of each value.
 *
 *      value → list of positions
 *
 * 2. For every list:
 *
 *      • Use two pointers.
 *
 *      • Expand the right pointer.
 *
 *      • Required deletions:
 *
 *            positions[right]
 *            - positions[left]
 *            - (right - left)
 *
 *      • While deletions > k:
 *
 *            left++
 *
 *      • Window length:
 *
 *            right - left + 1
 *
 *      • Update the answer.
 *
 * 3. Return the maximum window length.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [1,1,2,2,1,1]
 * k = 2
 *
 * For value 1:
 *
 * positions = [0,1,4,5]
 *
 * left = 0
 * right = 3
 *
 * deletions =
 *
 *      5 - 0 - 3
 *      = 2
 *
 * which is allowed.
 *
 * window size =
 *
 *      4
 *
 * Answer = 4.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var longestEqualSubarray = function (nums, k) {
  const positions = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (!positions.has(nums[i])) {
      positions.set(nums[i], []);
    }

    positions.get(nums[i]).push(i);
  }

  let answer = 0;

  for (const indices of positions.values()) {
    let left = 0;

    for (let right = 0; right < indices.length; right++) {
      while (indices[right] - indices[left] - (right - left) > k) {
        left++;
      }

      answer = Math.max(answer, right - left + 1);
    }
  }

  return answer;
};
