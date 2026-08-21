/**
 * Maximum Total Sum of K Selected Elements
 * Intuition: We can sort the array nums and then select the k largest elements from the sorted array. For the i-th element, we can choose to multiply it by max(1, mul) and add it to the total sum, and then mul decreases by 1. Finally, we return the total sum.
 * Approach: 1. Follow Greedy + Sorting. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: nums = [6,1,2,9], k = 3, mul = 2. Output: 26.
 * Time Complexity: O(nlogn)
 * Space Complexity: O(logn)
 */
var maxSum = function (nums, k, mul) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let ans = 0;

  for (let i = n - 1; i >= n - k; i--) {
    const m = Math.max(1, mul);
    ans += nums[i] * m;
    mul--;
  }

  return ans;
};
