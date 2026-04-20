/**
 * Transformed Array
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
