/**
 * Maximum Score of a Split
 * Intuition: We first define an array \textit{suf} of length n, where \textit{suf}[i] represents the minimum value of the array \textit{nums} from index i to index n - 1. We can traverse the array \textit{nums} from back to front to compute the array \textit{suf}.
 * Approach: Next, we define a variable \textit{pre} to represent the prefix sum of the array \textit{nums}. We traverse the first n - 1 elements of the array \textit{nums}. For each index i, we add \textit{nums}[i] to \textit{pre} and calculate the split score \textit{score}(i) = \textit{pre} - \textit{suf}[i + 1]. We use a variable \textit{ans} to maintain the maximum value among all split scores. The time complexity is O(n), and the space complexity is O(n). Here, n is the length of the array \textit{nums}.
 * Dry Run: Input nums = [10,-1,3,-4,-5]. Output 17.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var maximumScore = function (nums) {
  const n = nums.length;
  const suf = new Array(n);
  suf[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; --i) {
    suf[i] = Math.min(nums[i], suf[i + 1]);
  }
  let ans = Number.NEGATIVE_INFINITY;
  let pre = 0;
  for (let i = 0; i < n - 1; ++i) {
    pre += nums[i];
    ans = Math.max(ans, pre - suf[i + 1]);
  }
  return ans;
};
