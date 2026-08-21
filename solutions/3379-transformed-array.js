/**
 * Transformed Array
 * Intuition: Each index i lands at (i + nums[i]) modulo n on the circular array; zeros stay put.
 * Approach: For every i, if nums[i] is 0 write 0; else compute ((i + nums[i]) % n + n) % n and copy nums at that index into result[i].
 * Dry Run: nums = [3,-2,1,1] -> from 0 land at 3 value 1; from 1 land at 3 value 1; from 2 land at 3 value 1; from 3 land at 0 value 3; result [1,1,1,3].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var constructTransformedArray = function (nums) {
  const n = nums.length;
  const result = new Array(n);

  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) {
      result[i] = 0;
    } else {
      const steps = nums[i];
      const rawIndex = i + steps;
      const landedIndex = ((rawIndex % n) + n) % n;
      result[i] = nums[landedIndex];
    }
  }

  return result;
};
