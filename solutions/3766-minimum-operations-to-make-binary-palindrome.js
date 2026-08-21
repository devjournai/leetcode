/**
 * Minimum Operations to Make Binary Palindrome
 * Intuition: We observe that the range of numbers given in the problem is only [1, 5000]. Therefore, we directly preprocess all binary palindromic numbers in the range [0, 2^{14}) and store them in an array, denoted as \textit{p}.
 * Approach: Next, for each number x, we use binary search to find the first palindromic number greater than or equal to x in the array \textit{p}, denoted as \textit{p}[i], as well as the first palindromic number less than x, denoted as \textit{p}[i - 1]. Then, we calculate the number of operations required to convert x to these two palindromic numbers and take the minimum value as the answer. The time complexity is O(n \times \log M), and the space complexity is O(M). Where n is the length of the array \textit{nums}, and M is the number of preprocessed binary palindromic numbers.
 * Dry Run: Input nums = [1,2,4]. Output [0,1,1].
 * Time Complexity: O(n \times \log M)
 * Space Complexity: O(M)
 */
const p = (() => {
  const res = [];
  const N = 1 << 14;
  for (let i = 0; i < N; i++) {
    const s = i.toString(2);
    if (s === s.split("").reverse().join("")) {
      res.push(i);
    }
  }
  return res;
})();

var minOperations = function (nums) {
  const ans = Array(nums.length).fill(Number.MAX_SAFE_INTEGER);

  for (let k = 0; k < nums.length; k++) {
    const x = nums[k];
    const i = _.sortedIndex(p, x);
    if (i < p.length) {
      ans[k] = p[i] - x;
    }
    if (i >= 1) {
      ans[k] = Math.min(ans[k], x - p[i - 1]);
    }
  }

  return ans;
};
