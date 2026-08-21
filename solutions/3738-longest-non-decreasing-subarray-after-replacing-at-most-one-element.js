/**
 * Longest Non-Decreasing Subarray After Replacing at Most One Element
 * Intuition: We can use two arrays \textit{left} and \textit{right} to record the length of the longest non-decreasing subarray ending and starting at each position, respectively. Initially, \textit{left}[i] = 1 and \textit{right}[i] = 1.
 * Approach: Then, we traverse the array in the range [1, n-1]. If \textit{nums}[i] \geq \textit{nums}[i-1], we update \textit{left}[i] to \textit{left}[i-1] + 1. Similarly, we traverse the array backwards in the range [n-2, 0]. If \textit{nums}[i] \leq \textit{nums}[i+1], we update \textit{right}[i] to \textit{right}[i+1] + 1. Next, we can compute the final answer by enumerating each position. For each position i, we can calculate the length of the longest non-decreasing subarray centered at i in the following way: 1. If the elements on the left and right sides of i do not satisfy \textit{nums}[i-1] \leq \textit{nums}[i+1], we can only choose the non-decreasing subarray from either the left or right side, so the answer is \max(\textit{left}[i-1], \textit{right}[i+1]) + 1. 2. Otherwise, we can replace position i with an appropriate value so that the non-decreasing subarrays on the left and right can be connected, so the answer is \textit{left}[i-1] + \textit{right}[i+1] + 1. Finally, we take the maximum value across all positions as the final answer. The time complexity is O(n), and the space complexity is O(n), where n is the length of the array.
 * Dry Run: Input nums = [1,2,3,1,2]. Output 4.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var longestSubarray = function (nums) {
  const n = nums.length;
  const left = Array(n).fill(1);
  const right = Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    if (nums[i] >= nums[i - 1]) {
      left[i] = left[i - 1] + 1;
    }
  }

  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] <= nums[i + 1]) {
      right[i] = right[i + 1] + 1;
    }
  }

  let ans = Math.max(...left);

  for (let i = 0; i < n; i++) {
    const a = i - 1 < 0 ? 0 : left[i - 1];
    const b = i + 1 >= n ? 0 : right[i + 1];
    if (i - 1 >= 0 && i + 1 < n && nums[i - 1] > nums[i + 1]) {
      ans = Math.max(ans, Math.max(a + 1, b + 1));
    } else {
      ans = Math.max(ans, a + b + 1);
    }
  }

  return ans;
};
