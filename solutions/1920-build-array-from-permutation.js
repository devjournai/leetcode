/**
 * Build Array From Permutation
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var buildArray = function (nums) {
  return nums.map((currentNumValue) => nums[currentNumValue]);
};
