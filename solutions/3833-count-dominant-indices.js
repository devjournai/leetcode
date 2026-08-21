/**
 * Count Dominant Indices
 * Intuition: We can traverse the array from back to front, maintaining a suffix sum $\text{suf}$, which represents the sum of all elements to the right of the current element. For each element, we check if it is greater than the average value of the elements to its right $\frac{\text{suf}}{n - i - 1}$. If so, we increment the answer by one. Finally, we return the answer. The time complexity is $O(n)$, where $n$ is the length of the array $\text{nums}$. The space complexity is $O(1)$.
 * Approach: We can traverse the array from back to front, maintaining a suffix sum $\text{suf}$, which represents the sum of all elements to the right of the current element. For each element, we check if it is greater than the average value of the elements to its right $\frac{\text{suf}}{n - i - 1}$. If so, we increment the answer by one. Finally, we return the answer. The time complexity is $O(n)$, where $n$ is the length of the array $\text{nums}$. The space complexity is $O(1)$.
 * Dry Run: Input: nums = [5,4,3] => Output: 2
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var dominantIndices = function (nums) {
  const n = nums.length;
  let ans = 0;
  let suf = nums[n - 1];
  for (let i = n - 2; i >= 0; --i) {
    if (nums[i] * (n - i - 1) > suf) {
      ans++;
    }
    suf += nums[i];
  }
  return ans;
};
