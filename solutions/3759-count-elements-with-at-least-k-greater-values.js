/**
 * Count Elements With at Least K Greater Values
 * Intuition: If k = 0, then all elements in the array are qualified elements, and we can directly return the length of the array.
 * Approach: Otherwise, we sort the array, and let n be the length of the sorted array. For each index i satisfying 0 \leq i < n - k, if the element at index i is strictly less than the element at index n - k, then it is a qualified element. We just need to count the number of such elements and return it. The time complexity is O(n \times \log n), and the space complexity is O(\log n), where n is the length of the array \textit{nums}.
 * Dry Run: Input nums = [3,1,2], k = 1. Output 2.
 * Time Complexity: O(n \times \log n)
 * Space Complexity: O(\log n)
 */
var countElements = function (nums, k) {
  const n = nums.length;
  if (k === 0) {
    return n;
  }
  nums.sort((a, b) => a - b);
  let ans = 0;
  for (let i = 0; i < n - k; ++i) {
    if (nums[n - k] > nums[i]) {
      ++ans;
    }
  }
  return ans;
};
