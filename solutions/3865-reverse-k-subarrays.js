/**
 * Reverse K Subarrays
 * Intuition: Since we need to partition the array into $k$ subarrays of equal length, the length of each subarray is $m = \frac{n}{k}$. We can use a loop to traverse the array with a step size of $m$, and in each iteration, reverse the current subarray. The time complexity is $O(n)$, where $n$ is the length of the array $\textit{nums}$. The space complexity is $O(1)$, as we only use a constant amount of extra space.
 * Approach: Since we need to partition the array into $k$ subarrays of equal length, the length of each subarray is $m = \frac{n}{k}$. We can use a loop to traverse the array with a step size of $m$, and in each iteration, reverse the current subarray. The time complexity is $O(n)$, where $n$ is the length of the array $\textit{nums}$. The space complexity is $O(1)$, as we only use a constant amount of extra space.
 * Dry Run: Input: nums = [1,2,4,3,5,6], k = 3 => Output: [2,1,3,4,6,5]
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var reverseSubarrays = function (nums, k) {
  const n = nums.length;
  const m = Math.floor(n / k);
  for (let i = 0; i < n; i += m) {
    let l = i,
      r = i + m - 1;
    while (l < r) {
      const t = nums[l];
      nums[l++] = nums[r];
      nums[r--] = t;
    }
  }
  return nums;
};
