/**
 * Minimum Subarray Length With Distinct Sum At Least K
 * Intuition: We use a hash table \textit{cnt} to record the occurrence count of each element in the current window, and a variable \textit{s} to record the sum of distinct elements in the current window. We use two pointers l and r to represent the left and right boundaries of the current window, both initially pointing to the beginning of the array. We initialize a variable \textit{ans} to record the minimum length of a window that satisfies the condition, with an initial value of n + 1, where n is the length of the array.
 * Approach: We continuously move the right pointer r, adding new elements into the window and updating \textit{cnt} and \textit{s}. When \textit{s} is greater than or equal to k, we try to move the left pointer l to shrink the window, updating \textit{cnt} and \textit{s} accordingly, until \textit{s} is less than k. During this process, we record the minimum length of windows that satisfy the condition. Finally, if \textit{ans} \gt n, it means no valid window exists, and we return -1; otherwise we return \textit{ans}. The time complexity is O(n), and the space complexity is O(n), where n is the length of the array.
 * Dry Run: Input nums = [2,2,3,1], k = 4. Output 2.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var minLength = function (nums, k) {
  const n = nums.length;
  let ans = n + 1;
  const cnt = new Map();
  let l = 0;
  let s = 0;
  for (let r = 0; r < n; ++r) {
    cnt.set(nums[r], (cnt.get(nums[r]) ?? 0) + 1);
    if (cnt.get(nums[r]) === 1) {
      s += nums[r];
    }
    while (s >= k) {
      ans = Math.min(ans, r - l + 1);
      cnt.set(nums[l], (cnt.get(nums[l]) ?? 0) - 1);
      if (cnt.get(nums[l]) === 0) {
        s -= nums[l];
      }
      ++l;
    }
  }
  return ans > n ? -1 : ans;
};
