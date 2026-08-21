/**
 * Transform Array by Parity
 * Intuition: Replace evens with 0 and odds with 1, then sort non-decreasing — equivalent to counting parities and emitting zeros then ones.
 * Approach: 1. Count even and odd numbers. 2. Build an array of `evenCount` zeros followed by `oddCount` ones.
 * Dry Run: nums = [4,3,2,1] → two evens, two odds → [0,0,1,1].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var transformArray = function (nums) {
  let evenCount = 0;
  for (const value of nums) {
    if (value % 2 === 0) {
      evenCount++;
    }
  }

  const transformed = new Array(nums.length);
  for (let index = 0; index < evenCount; index++) {
    transformed[index] = 0;
  }
  for (let index = evenCount; index < nums.length; index++) {
    transformed[index] = 1;
  }
  return transformed;
};
