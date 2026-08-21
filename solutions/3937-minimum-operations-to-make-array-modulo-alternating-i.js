/**
 * Minimum Operations to Make Array Modulo Alternating I
 * Intuition: We can enumerate the target value x for even indices and the target value y for odd indices, where 0 leq x, y < k and x neq y. For each element, we calculate the number of operations required to change it to the target value, and accumulate the total number of operations. Finally, we return the minimum value among all enumeration results.
 * Approach: 1. Follow Enumeration. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: nums = [1,4,2,8], k = 3. Output: 2.
 * Time Complexity: O(n * k^2)
 * Space Complexity: O(1)
 */
var minOperations = function (nums, k) {
  const n = nums.length;

  for (let i = 0; i < n; ++i) {
    nums[i] %= k;
  }

  let ans = Infinity;

  for (let x = 0; x < k; ++x) {
    for (let y = 0; y < k; ++y) {
      if (x !== y) {
        let cnt = 0;

        for (let i = 0; i < n; ++i) {
          const target = (i & 1) === 0 ? x : y;
          const diff = Math.abs(target - nums[i]);
          cnt += Math.min(diff, k - diff);
        }

        ans = Math.min(ans, cnt);
      }
    }
  }

  return ans;
};
