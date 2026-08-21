/**
 * Smallest Subarray to Sort in Every Sliding Window
 * Intuition: Inside a window the unsorted core is the shortest subarray that, once sorted, sorts the window. That core is between the leftmost inversion from the right and the rightmost inversion from the left.
 * Approach: 1. For each window [i, i+k-1], scan left-to-right tracking max to find the last drop, and right-to-left tracking min to find the first rise. 2. Length is last - first + 1, or 0 if already sorted.
 * Dry Run: nums = [1, 3, 2, 4], k = 3. Window [1,3,2]: last inversion at 2, first at 1 → length 2. Window [3,2,4]: length 2.
 * Time Complexity: O(N * K)
 * Space Complexity: O(N)
 */
var minSubarraySort = function (nums, k) {
  const n = nums.length;

  const unsortedLength = (left, right) => {
    let windowMax = -Infinity;
    let windowMin = Infinity;
    let last = -1;
    let first = -1;

    for (let p = left; p <= right; p++) {
      if (nums[p] < windowMax) {
        last = p;
      } else {
        windowMax = nums[p];
      }
      const q = right - (p - left);
      if (nums[q] > windowMin) {
        first = q;
      } else {
        windowMin = nums[q];
      }
    }

    return last === -1 ? 0 : last - first + 1;
  };

  const answer = [];
  for (let i = 0; i <= n - k; i++) {
    answer.push(unsortedLength(i, i + k - 1));
  }
  return answer;
};
